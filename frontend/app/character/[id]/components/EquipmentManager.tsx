'use client';

import { useState, useEffect, useRef } from 'react';
import { api } from '@/lib/api';
import { CharacterItem, ItemCategory, WornBonus } from '@/lib/types';
import { armorMagicBonus, detectedMagicBonus, weaponMagicBonus } from '@/lib/magicBonus';
import { hasStealthDisadvantage, strengthRequirement } from '@/lib/armorPenalties';
import { baseCandidates, composeMagicItem, isMagicGear, liveName, needsBase, remakeFrom } from '@/lib/itemComposition';
import { describeWornBonus, detectedWornBonus, hasWornBonus, isWearable } from '@/lib/wornItems';
import { ammunitionChoices, standardAmmunition, usesAmmunition, weaponAmmunition } from '@/lib/ammunition';
import { describeError, Markdown, Modal, useToast } from '@/app/components/ui';
import { stripMarkdown } from '@/lib/markdown';
import { formatValue, gearValue, itemValue } from '@/lib/itemValue';
import { useSheetReadOnly } from '../SheetReadOnly';

interface EquipmentManagerProps {
    characterId: string;
    initialEquipment: (string | CharacterItem)[];
    onUpdate: (newEquipment: (string | CharacterItem)[]) => void;
    onEquipChange?: () => void;
    abilityScores?: { str: number; dex: number; con: number; int: number; wis: number; cha: number };
    proficiencyBonus?: number;
    existingActions?: any[];
    /** Adds a "Use <item>" action for magic items (weapons and mastery show in Actions on their own) */
    onCreateAction?: (action: any) => Promise<void>;
}

export default function EquipmentManager({ 
    characterId, 
    initialEquipment, 
    onUpdate, 
    onEquipChange,
    abilityScores = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    proficiencyBonus = 2,
    existingActions = [],
    onCreateAction,
}: EquipmentManagerProps) {
    const toast = useToast();
    const readOnly = useSheetReadOnly();
    const [equipment, setEquipment] = useState<(string | CharacterItem)[]>(initialEquipment || []);
    const [baseItems, setBaseItems] = useState<CharacterItem[]>([]);
    // Full base-item reference list, keyed by id, used only to overlay live
    // name/description onto owned items that were added from this list (see
    // mergeLiveBaseItem below) — separate from `baseItems`, which is scoped
    // to whatever category the "Add Item" picker currently has open.
    const [baseItemsById, setBaseItemsById] = useState<Record<string, CharacterItem>>({});
    const [isAdding, setIsAdding] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'custom'>('custom');
    // Cache fetched categories so navigating between them doesn't re-fetch
    const categoryCache = useRef<Partial<Record<ItemCategory | 'all', CharacterItem[]>>>({});
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newCustomItem, setNewCustomItem] = useState<Partial<CharacterItem>>({
        name: '',
        category: 'miscellaneous',
        quantity: 1
    });
    const [editingQuantity, setEditingQuantity] = useState<{ [index: number]: string }>({});
    // Adding a magic weapon/armor/shield that fits several base items: which one it is
    const [choosingBase, setChoosingBase] = useState<{ item: CharacterItem; candidates: CharacterItem[] } | null>(null);

    useEffect(() => {
        setEquipment(initialEquipment || []);
    }, [initialEquipment]);

    useEffect(() => {
        api.get('/reference/base-items').then((data: CharacterItem[]) => {
            const byId: Record<string, CharacterItem> = {};
            for (const item of Array.isArray(data) ? data : []) {
                if (item.id) byId[item.id] = item;
            }
            setBaseItemsById(byId);
        }).catch(err => console.error('Failed to fetch base items', err));
    }, []);

    /**
     * Owned items added from the base-item list carry a `baseItemId`. Overlay
     * the current admin-edited name/description onto them at render time, so
     * edits reflect on characters that already own the item. Stats a player
     * can hand-edit (quantity, equipped, baseAC, armorMethod, damage,
     * damageType) stay exactly as stored — merging those live would silently
     * undo the player's own edits.
     */
    const mergeLiveBaseItem = (item: CharacterItem): CharacterItem => {
        const live = item.baseItemId ? baseItemsById[item.baseItemId] : undefined;
        if (!live) return item;
        return { ...item, name: liveName(item, live), description: item.descriptionEdited ? item.description : live.description };
    };

    // Fetch base items lazily — only when the add panel is open and a non-custom category is selected
    useEffect(() => {
        if (!isAdding || selectedCategory === 'custom') {
            setBaseItems([]);
            return;
        }
        const fetchBaseItems = async () => {
            const cacheKey = selectedCategory as ItemCategory;
            if (categoryCache.current[cacheKey]) {
                setBaseItems(categoryCache.current[cacheKey]!);
                return;
            }
            try {
                const data = await api.get(`/reference/base-items/${selectedCategory}`);
                const items = Array.isArray(data) ? data : [];
                categoryCache.current[cacheKey] = items;
                setBaseItems(items);
            } catch (err) {
                console.error('Failed to fetch base items', err);
            }
        };
        fetchBaseItems();
    }, [isAdding, selectedCategory]);

    const catalogue = Object.values(baseItemsById);

    /** Magic weapons, armor and shields are made from a base item: pick it (or ask which) before adding. */
    const handleAddBaseItem = (baseItem: CharacterItem) => {
        if (needsBase(baseItem)) {
            const candidates = baseCandidates(baseItem, catalogue);
            if (candidates.length === 1) return addItem(composeMagicItem(baseItem, candidates[0], true), baseItem.id);
            if (candidates.length > 1) {
                setChoosingBase({ item: baseItem, candidates });
                return;
            }
        }
        return addItem(baseItem, baseItem.id);
    };

    const addItem = async (item: CharacterItem, catalogueId?: string) => {
        try {
            const { id: _id, ...rest } = item as CharacterItem & { id?: string };
            const itemToAdd: CharacterItem = {
                ...rest,
                ...(catalogueId && { baseItemId: catalogueId }),
                equipped: false,
                quantity: 1
            };
            await api.post(`/characters/${characterId}/equipment`, {
                item: itemToAdd
            });
            const newEquipment = [...equipment, itemToAdd];
            setEquipment(newEquipment);
            onUpdate(newEquipment);
            setIsAdding(false);
            setChoosingBase(null);
        } catch (err) {
            console.error('Failed to add equipment', err);
            toast.error(describeError("Couldn't add equipment", err));
        }
    };

    const handleAddCustomItem = async () => {
        if (!newCustomItem.name?.trim()) return;

        try {
            const itemToAdd: CharacterItem = {
                name: newCustomItem.name.trim(),
                category: newCustomItem.category || 'miscellaneous',
                quantity: newCustomItem.quantity || 1,
                description: newCustomItem.description,
                ...(newCustomItem.value?.trim() ? { value: newCustomItem.value.trim() } : {}),
                type: newCustomItem.type,
                armorMethod: newCustomItem.armorMethod,
                baseAC: newCustomItem.baseAC,
                damage: newCustomItem.damage,
                damageType: newCustomItem.damageType,
                properties: newCustomItem.properties,
                equipped: false,
                isBaseItem: false
            };
            await api.post(`/characters/${characterId}/equipment`, {
                item: itemToAdd
            });
            const newEquipment = [...equipment, itemToAdd];
            setEquipment(newEquipment);
            onUpdate(newEquipment);
            setNewCustomItem({ name: '', category: 'miscellaneous', quantity: 1 });
            setIsAdding(false);
        } catch (err) {
            console.error('Failed to add equipment', err);
            toast.error(describeError("Couldn't add equipment", err));
        }
    };

    const handleRemove = async (index: number) => {
        try {
            await api.delete(`/characters/${characterId}/equipment`, {
                data: { index }
            });
            const newEquipment = [...equipment];
            newEquipment.splice(index, 1);
            setEquipment(newEquipment);
            onUpdate(newEquipment);
            if (onEquipChange) onEquipChange();
        } catch (err) {
            console.error('Failed to remove equipment', err);
            toast.error(describeError("Couldn't remove equipment", err));
        }
    };

    const isArmor = (i: CharacterItem) => i.category === 'armor' || i.type === 'armor';
    const isShield = (i: CharacterItem) => i.category === 'shield' || i.type === 'shield';
    const isWeapon = (i: CharacterItem) => i.category === 'weapon' || i.type === 'weapon';
    // Worn magic items (rings, cloaks, bracers) give their bonuses while equipped
    const isEquipable = (i: CharacterItem) => isArmor(i) || isShield(i) || isWeapon(i) || isWearable(i);

    /** Ammunition for a ranged weapon: the catalogue's bundle ("Arrows", 20) or a plain item of that name. */
    const addAmmunition = async (name: string, bundle: number) => {
        const base = catalogue.find(c => c.name.toLowerCase() === name.toLowerCase());
        const { id: _id, ...rest } = (base ?? {}) as CharacterItem & { id?: string };
        const itemToAdd: CharacterItem = base
            ? { ...rest, baseItemId: base.id, equipped: false, quantity: bundle }
            : { name, category: 'miscellaneous', type: 'other', equipped: false, isBaseItem: false, quantity: bundle };
        try {
            await api.post(`/characters/${characterId}/equipment`, { item: itemToAdd });
            const newEquipment = [...equipment, itemToAdd];
            setEquipment(newEquipment);
            onUpdate(newEquipment);
            toast.success(`Added ${bundle} ${name}.`);
        } catch (err) {
            console.error('Failed to add ammunition', err);
            toast.error(describeError(`Couldn't add ${name}`, err));
        }
    };

    const handleEquipToggle = async (index: number, item: CharacterItem) => {
        const newEquipped = !item.equipped;
        
        // Handle exclusive equipment (only one armor, one shield can be equipped)
        if (newEquipped && (isArmor(item) || isShield(item))) {
            const newEquipment = [...equipment];
            newEquipment.forEach((eq, i) => {
                if (i !== index && typeof eq !== 'string') {
                    const eqItem = eq as CharacterItem;
                    const sameKind = (isArmor(item) && isArmor(eqItem)) || (isShield(item) && isShield(eqItem));
                    if (sameKind && eqItem.equipped) {
                        eqItem.equipped = false;
                    }
                }
            });
            setEquipment(newEquipment);
        }

        try {
            await api.patch(`/characters/${characterId}/equipment`, {
                index,
                item: { equipped: newEquipped }
            });
            const newEquipment = [...equipment];
            const current = newEquipment[index];
            const currentObj = typeof current === 'string' ? { name: current } : current;
            newEquipment[index] = { ...currentObj, equipped: newEquipped };
            setEquipment(newEquipment);
            onUpdate(newEquipment);
            if (onEquipChange) onEquipChange();
        } catch (err) {
            console.error('Failed to update equipment', err);
        }
    };

    const handleUpdateItem = async (index: number, updates: Partial<CharacterItem>) => {
        try {
            await api.patch(`/characters/${characterId}/equipment`, {
                index,
                item: updates
            });
            const newEquipment = [...equipment];
            const current = newEquipment[index];
            const currentObj = typeof current === 'string' ? { name: current } : current;
            newEquipment[index] = { ...currentObj, ...updates };
            setEquipment(newEquipment);
            onUpdate(newEquipment);
            if (onEquipChange) onEquipChange();
        } catch (err) {
            console.error('Failed to update item', err);
        }
    };

    const actionExists = (name: string) =>
        existingActions.some((a: any) => String(a?.name ?? '').trim().toLowerCase() === name.trim().toLowerCase());

    const handleCreateMagicItemAction = async (item: CharacterItem, index: number) => {
        if (!item.name) return;
        
        if (!onCreateAction) {
            toast.error('Action creation is not available');
            return;
        }
        
        try {
            const action = {
                name: `Use ${item.name}`,
                description: item.description || `Use the ${item.name}.`,
                type: 'action' as const
            };
            if (actionExists(action.name)) {
                toast.error(`"${action.name}" is already in your actions.`);
                return;
            }
            await onCreateAction(action);
            toast.success(`Action "${action.name}" created!`);
        } catch (err) {
            console.error('Failed to create action', err);
            toast.error(describeError("Couldn't create action", err));
        }
    };

    const handleCreateMagicItemBonusAction = async (item: CharacterItem, index: number) => {
        if (!item.name) return;
        
        if (!onCreateAction) {
            toast.error('Action creation is not available');
            return;
        }
        
        try {
            // Distinct name from the action version, so the two aren't mistaken for duplicates
            const action = {
                name: `Use ${item.name} (Bonus)`,
                description: item.description || `Use the ${item.name}.`,
                type: 'bonus' as const
            };
            if (actionExists(action.name)) {
                toast.error(`"${action.name}" is already in your actions.`);
                return;
            }
            await onCreateAction(action);
            toast.success(`Bonus Action "${action.name}" created!`);
        } catch (err) {
            console.error('Failed to create bonus action', err);
            toast.error(describeError("Couldn't create bonus action", err));
        }
    };

    const categories: ItemCategory[] = ['armor', 'weapon', 'shield', 'tool', 'magic-item', 'potion', 'scroll', 'miscellaneous'];
    const safeBaseItems = Array.isArray(baseItems) ? baseItems : [];
    const filteredBaseItems = selectedCategory === 'custom'
        ? []
        : safeBaseItems.filter(item => {
            // Duplicates and replaced entries stay in the catalogue for characters that own them
            if (item.legacy) return false;
            if (!searchTerm.trim()) return true;
            const searchLower = searchTerm.toLowerCase();
            return (
                item.name.toLowerCase().includes(searchLower) ||
                (item.description && item.description.toLowerCase().includes(searchLower)) ||
                (item.type && item.type.toLowerCase().includes(searchLower)) ||
                (item.properties && item.properties.some(p => p.toLowerCase().includes(searchLower)))
            );
        });

    // Resolve category for string items (e.g. "Shortbow" from starting equipment) using baseItems so they appear in the right section
    const getCategoryForItem = (item: string | CharacterItem): ItemCategory => {
        if (typeof item !== 'string') return (item.category || 'miscellaneous') as ItemCategory;
        const base = safeBaseItems.find(b => b.name?.toLowerCase() === (item as string).toLowerCase());
        return (base?.category as ItemCategory) || 'miscellaneous';
    };

    // Group equipment by category, keeping each item's index in the full equipment array
    type EquipmentEntry = { item: string | CharacterItem; index: number };
    const equipmentByCategory = categories.reduce((acc, cat) => {
        const entries: EquipmentEntry[] = [];
        equipment.forEach((item, idx) => {
            const category = getCategoryForItem(item);
            if (category === cat) {
                entries.push({ item, index: idx });
            }
        });
        acc[cat] = entries;
        return acc;
    }, {} as Record<ItemCategory, EquipmentEntry[]>);

    return (
        <div className="card">
            <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Equipment
                {!readOnly && (
                    <button
                        className="btn"
                        style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
                        onClick={() => setIsAdding(true)}
                    >
                        + Add Item
                    </button>
                )}
            </h3>

            {isAdding && (
                <Modal onClose={() => {
                    setIsAdding(false);
                    setChoosingBase(null);
                    setSearchTerm('');
                }} ariaLabel="Add Item" contentStyle={{ maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                    <h3>Add Item</h3>
                    {choosingBase ? (
                        <ChooseBase
                            item={choosingBase.item}
                            candidates={choosingBase.candidates}
                            onChoose={(base) => addItem(composeMagicItem(choosingBase.item, base, false), choosingBase.item.id)}
                            onBack={() => setChoosingBase(null)}
                        />
                    ) : (<>
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="equipmentmanager-select-category" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Select Category</label>
                        <select id="equipmentmanager-select-category"
                            className="input"
                            value={selectedCategory}
                            onChange={e => {
                                setSelectedCategory(e.target.value as ItemCategory | 'custom');
                                setSearchTerm('');
                            }}
                            style={{ width: '100%' }}
                        >
                            <option value="custom">Custom Item</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}</option>
                            ))}
                        </select>
                    </div>

                    {selectedCategory === 'custom' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <input
                                type="text"
                                className="input"
                                placeholder="Item name"
                                value={newCustomItem.name || ''}
                                onChange={e => setNewCustomItem({ ...newCustomItem, name: e.target.value })}
                            />
                            <select
                                className="input"
                                value={newCustomItem.category || 'miscellaneous'}
                                onChange={e => setNewCustomItem({ ...newCustomItem, category: e.target.value as ItemCategory })}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}</option>
                                ))}
                            </select>
                            <textarea
                                className="input"
                                placeholder="Description (optional)"
                                aria-label="Description"
                                aria-describedby="equipmentmanager-markdown-hint"
                                value={newCustomItem.description || ''}
                                onChange={e => setNewCustomItem({ ...newCustomItem, description: e.target.value })}
                                rows={3}
                            />
                            <MarkdownHint id="equipmentmanager-markdown-hint" />
                            <label htmlFor="equipmentmanager-new-value" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Value (each, optional)</label>
                            <input id="equipmentmanager-new-value"
                                type="text"
                                className="input"
                                placeholder="e.g. 50 gp"
                                maxLength={60}
                                value={newCustomItem.value || ''}
                                onChange={e => setNewCustomItem({ ...newCustomItem, value: e.target.value })}
                            />
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                <button className="btn" onClick={handleAddCustomItem}>Add</button>
                                <button className="btn btn-secondary" onClick={() => setIsAdding(false)}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div style={{ overflowY: 'auto', flex: 1, marginTop: '0.5rem', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginBottom: '0.75rem' }}>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Search items..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    style={{ width: '100%' }}
                                />
                            </div>
                            {filteredBaseItems.length === 0 ? (
                                <p style={{ color: 'var(--text-muted)' }}>
                                    {searchTerm.trim() 
                                        ? `No items found matching "${searchTerm}"` 
                                        : 'No base items in this category.'}
                                </p>
                            ) : (
                                <>
                                    <div style={{ 
                                        fontSize: '0.75rem', 
                                        color: 'var(--text-muted)', 
                                        marginBottom: '0.5rem' 
                                    }}>
                                        {filteredBaseItems.length} item{filteredBaseItems.length !== 1 ? 's' : ''} found
                                    </div>
                                    <div style={{ display: 'grid', gap: '0.5rem', flex: 1, overflowY: 'auto' }}>
                                        {filteredBaseItems.map((item, i) => (
                                            <div
                                                key={i}
                                                className="card"
                                                style={{ cursor: 'pointer', padding: '0.75rem' }}
                                                onClick={() => handleAddBaseItem(item)}
                                            >
                                                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{item.name}</div>
                                                {item.description && (() => {
                                                    const preview = stripMarkdown(item.description);
                                                    return (
                                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                                            {preview.substring(0, 100)}{preview.length > 100 ? '...' : ''}
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                            <button 
                                className="btn btn-secondary" 
                                style={{ marginTop: '1rem', width: '100%' }} 
                                onClick={() => {
                                    setIsAdding(false);
                                    setSearchTerm('');
                                }}
                            >
                                Close
                            </button>
                        </div>
                    )}
                    </>)}
                </Modal>
            )}

            <div style={{ position: 'relative' }}>
                <div 
                    className="collapsible-list"
                    style={{ 
                        maxHeight: isExpanded ? 'none' : '400px',
                        overflowY: isExpanded ? 'visible' : 'auto',
                        paddingRight: isExpanded ? '0' : '0.5rem',
                        marginRight: isExpanded ? '0' : '-0.5rem'
                    }}
                >
                    {categories.map(category => {
                        const categoryEntries = equipmentByCategory[category];
                        if (categoryEntries.length === 0) return null;

                        return (
                            <div key={category} style={{ marginBottom: '1rem' }}>
                                <h4 style={{ 
                                    fontSize: '0.875rem', 
                                    fontWeight: 'bold', 
                                    color: 'var(--text-muted)', 
                                    textTransform: 'uppercase',
                                    marginBottom: '0.5rem',
                                    borderBottom: '1px solid var(--border)',
                                    paddingBottom: '0.25rem'
                                }}>
                                    {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                                </h4>
                                <ul className="equipment-list" style={{ listStyle: 'none', padding: 0 }}>
                                    {categoryEntries.map(({ item, index: actualIndex }) => {
                                        const itemObj = typeof item === 'string'
                                            ? { name: item, category: getCategoryForItem(item) as ItemCategory }
                                            : mergeLiveBaseItem(item);
                                        const isItemExpanded = expandedIndex === actualIndex;

                                        return (
                                            <li key={actualIndex} style={{ borderBottom: '1px solid var(--border)', marginBottom: '0.5rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                                                        {(isEquipable(itemObj)) && (
                                                            <input
                                                                type="checkbox"
                                                                checked={!!itemObj.equipped}
                                                                disabled={readOnly}
                                                                onChange={() => handleEquipToggle(actualIndex, itemObj)}
                                                                title={isWearable(itemObj) ? (itemObj.attunement ? 'Worn and attuned?' : 'Worn?') : 'Equipped?'}
                                                                aria-label={`${isWearable(itemObj) ? 'Wear' : 'Equip'} ${itemObj.name}`}
                                                            />
                                                        )}
                                                        <span
                                                            style={{
                                                                fontWeight: itemObj.equipped ? 'bold' : 'normal',
                                                                cursor: 'pointer',
                                                                color: itemObj.equipped ? 'var(--primary)' : 'var(--text)'
                                                            }}
                                                            onClick={() => setExpandedIndex(isItemExpanded ? null : actualIndex)}
                                                        >
                                                            {itemObj.name} {typeof itemObj.quantity === 'number' && itemObj.quantity !== 1 ? `(x${itemObj.quantity})` : ''}
                                                            {itemValue(itemObj) && (
                                                                <span className="item-value-tag" title="Value of one">
                                                                    {' '}{itemValue(itemObj)}{typeof itemObj.quantity === 'number' && itemObj.quantity > 1 ? ' each' : ''}
                                                                </span>
                                                            )}
                                                            {(() => {
                                                                // A +N set on a plain item ("Longsword" made +1) shows next to its name
                                                                const bonus = isWeapon(itemObj) ? weaponMagicBonus(itemObj) : isArmor(itemObj) || isShield(itemObj) ? armorMagicBonus(itemObj) : 0;
                                                                return bonus > 0 && !itemObj.name.includes(`+${bonus}`)
                                                                    ? <span className="item-bonus-tag"> +{bonus}</span> : null;
                                                            })()}
                                                            {isArmor(itemObj) && hasStealthDisadvantage(itemObj) && (
                                                                <span className="item-penalty-tag" title="Disadvantage on Dexterity (Stealth) checks while worn"> Stealth Disadv.</span>
                                                            )}
                                                            {itemObj.equipped && ' ✓'}
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                        {itemObj.category === 'magic-item' && !readOnly && (
                                                            <>
                                                                <button
                                                                    className="btn btn-secondary"
                                                                    style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
                                                                    onClick={() => handleCreateMagicItemAction(itemObj, actualIndex)}
                                                                    title="Create Action"
                                                                >
                                                                    + Action
                                                                </button>
                                                                <button
                                                                    className="btn btn-secondary"
                                                                    style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
                                                                    onClick={() => handleCreateMagicItemBonusAction(itemObj, actualIndex)}
                                                                    title="Create Bonus Action"
                                                                >
                                                                    + Bonus
                                                                </button>
                                                            </>
                                                        )}
                                                        <button
                                                            className="btn btn-ghost"
                                                            style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
                                                            onClick={() => setExpandedIndex(isItemExpanded ? null : actualIndex)}
                                                        >
                                                            {isItemExpanded ? 'Collapse' : readOnly ? 'Details' : 'Edit'}
                                                        </button>
                                                        {!readOnly && (
                                                            <button
                                                                className="btn btn-ghost"
                                                                style={{ color: 'var(--text-muted)', fontSize: '1.25rem', lineHeight: 1, padding: '0 0.5rem' }}
                                                                onClick={() => handleRemove(actualIndex)}
                                                                title="Remove"
                                                            >
                                                                &times;
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                                {isItemExpanded && (
                                                    <div style={{ padding: '0.5rem', backgroundColor: 'var(--surface)', marginBottom: '0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>
                                                        <ItemDescription
                                                            index={actualIndex}
                                                            item={itemObj}
                                                            fromList={!!itemObj.baseItemId && !!baseItemsById[itemObj.baseItemId]}
                                                            readOnly={readOnly}
                                                            onSave={(updates) => handleUpdateItem(actualIndex, updates)}
                                                        />
                                                        <fieldset className="plain-fieldset" disabled={readOnly}>
                                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                            <div>
                                                                <label htmlFor="equipmentmanager-quantity" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Quantity</label>
                                                                <input id="equipmentmanager-quantity"
                                                                    type="text"
                                                                    inputMode="numeric"
                                                                    pattern="[0-9]*"
                                                                    className="input"
                                                                    value={editingQuantity[actualIndex] !== undefined 
                                                                        ? editingQuantity[actualIndex] 
                                                                        : String(itemObj.quantity ?? 1)}
                                                                    onChange={e => {
                                                                        const val = e.target.value;
                                                                        if (val === '' || /^\d+$/.test(val)) {
                                                                            setEditingQuantity({ ...editingQuantity, [actualIndex]: val });
                                                                        }
                                                                    }}
                                                                    onBlur={e => {
                                                                        const val = e.target.value;
                                                                        const parsed = parseInt(val, 10);
                                                                        const quantity = val === '' || Number.isNaN(parsed) ? 1 : parsed;
                                                                        handleUpdateItem(actualIndex, { quantity });
                                                                        const newEditing = { ...editingQuantity };
                                                                        delete newEditing[actualIndex];
                                                                        setEditingQuantity(newEditing);
                                                                    }}
                                                                    onKeyDown={e => {
                                                                        if (e.key === 'Enter') {
                                                                            e.currentTarget.blur();
                                                                        } else if (e.key === 'Escape') {
                                                                            const newEditing = { ...editingQuantity };
                                                                            delete newEditing[actualIndex];
                                                                            setEditingQuantity(newEditing);
                                                                            e.currentTarget.blur();
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label htmlFor={`equipmentmanager-value-${actualIndex}`} style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Value (each)</label>
                                                                <input id={`equipmentmanager-value-${actualIndex}`}
                                                                    key={itemObj.value ?? ''}
                                                                    type="text"
                                                                    className="input"
                                                                    maxLength={60}
                                                                    placeholder={itemObj.cost ? `Item list: ${itemObj.cost}` : 'e.g. 50 gp'}
                                                                    defaultValue={itemObj.value ?? ''}
                                                                    onBlur={e => {
                                                                        const value = e.target.value.trim();
                                                                        if (value !== (itemObj.value ?? '')) handleUpdateItem(actualIndex, { value });
                                                                    }}
                                                                    onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.blur(); }}
                                                                />
                                                            </div>
                                                            {(isArmor(itemObj) || isShield(itemObj)) && (
                                                                <div>
                                                                    <label htmlFor="equipmentmanager-base-ac" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Base AC</label>
                                                                    <input id="equipmentmanager-base-ac"
                                                                        type="text"
                                                                        inputMode="numeric"
                                                                        pattern="[0-9]*"
                                                                        className="input"
                                                                        value={(() => {
                                                                            const ac = itemObj.baseAC ?? (isShield(itemObj) ? 2 : 11);
                                                                            return ac === 0 ? '' : ac.toString();
                                                                        })()}
                                                                        onChange={e => {
                                                                            const val = e.target.value;
                                                                            if (val === '' || /^\d+$/.test(val)) {
                                                                                const baseAC = val === '' ? 0 : parseInt(val);
                                                                                handleUpdateItem(actualIndex, { baseAC });
                                                                            }
                                                                        }}
                                                                        onBlur={(e) => {
                                                                            if (e.target.value === '') {
                                                                                handleUpdateItem(actualIndex, { baseAC: isShield(itemObj) ? 2 : 11 });
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                        {isArmor(itemObj) && (
                                                            <div>
                                                                <label htmlFor="equipmentmanager-armor-type" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Armor Type</label>
                                                                <select id="equipmentmanager-armor-type"
                                                                    className="input"
                                                                    value={itemObj.armorMethod || 'light'}
                                                                    onChange={e => handleUpdateItem(actualIndex, { armorMethod: e.target.value as any })}
                                                                >
                                                                    <option value="light">Light (Dex)</option>
                                                                    <option value="medium">Medium (Max +2 Dex)</option>
                                                                    <option value="heavy">Heavy (No Dex)</option>
                                                                </select>
                                                                <label className="checkbox-row" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={hasStealthDisadvantage(itemObj)}
                                                                        onChange={e => handleUpdateItem(actualIndex, { stealthDisadvantage: e.target.checked })}
                                                                    />
                                                                    Disadvantage on Stealth checks
                                                                </label>
                                                                {strengthRequirement(itemObj) !== null && (
                                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                                        Needs Strength {strengthRequirement(itemObj)}, or your Speed drops by 10 ft.
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                        {isMagicGear(itemObj) && (() => {
                                                            // Made from: the base item whose stats this magic item uses (old items may have none yet)
                                                            const liveMagic = itemObj.baseItemId ? baseItemsById[itemObj.baseItemId] : undefined;
                                                            const candidates = baseCandidates(liveMagic ?? itemObj, catalogue);
                                                            if (candidates.length === 0 || (candidates.length === 1 && itemObj.baseName === candidates[0].name)) return null;
                                                            const baseId = `equipmentmanager-made-from-${actualIndex}`;
                                                            return (
                                                                <div style={{ marginTop: '0.5rem' }}>
                                                                    <label htmlFor={baseId} style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Made from</label>
                                                                    <select id={baseId}
                                                                        className="input"
                                                                        value={itemObj.baseName ?? ''}
                                                                        onChange={e => {
                                                                            const base = candidates.find(c => c.name === e.target.value);
                                                                            if (base) handleUpdateItem(actualIndex, remakeFrom(itemObj, base, liveMagic));
                                                                        }}
                                                                    >
                                                                        {!itemObj.baseName && <option value="">Choose what it is…</option>}
                                                                        {candidates.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                                                                    </select>
                                                                </div>
                                                            );
                                                        })()}
                                                        {(isWeapon(itemObj) || isArmor(itemObj) || isShield(itemObj)) && (() => {
                                                            // Magic bonus: set here, or read from the name/text ("Pistol, +1", "Shield +2") until set
                                                            const forWeapon = isWeapon(itemObj);
                                                            const detected = detectedMagicBonus(itemObj, forWeapon ? 'weapon' : 'armor');
                                                            const bonusId = `equipmentmanager-magic-bonus-${actualIndex}`;
                                                            return (
                                                                <div style={{ marginTop: '0.5rem' }}>
                                                                    <label htmlFor={bonusId} style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                                        {forWeapon ? 'Magic bonus (attack and damage)' : 'Magic bonus (AC)'}
                                                                    </label>
                                                                    <select id={bonusId}
                                                                        className="input"
                                                                        value={typeof itemObj.magicBonus === 'number' ? String(itemObj.magicBonus) : 'auto'}
                                                                        onChange={e => handleUpdateItem(actualIndex, { magicBonus: e.target.value === 'auto' ? null : Number(e.target.value) })}
                                                                    >
                                                                        <option value="auto">{detected ? `From the item: +${detected}` : 'From the item: none'}</option>
                                                                        <option value="0">None</option>
                                                                        <option value="1">+1</option>
                                                                        <option value="2">+2</option>
                                                                        <option value="3">+3</option>
                                                                    </select>
                                                                </div>
                                                            );
                                                        })()}
                                                        {isWeapon(itemObj) && usesAmmunition(itemObj) && (() => {
                                                            // Which gear this weapon shoots: found by kind (bows use Arrows) unless chosen here
                                                            const ammoId = `equipmentmanager-ammo-${actualIndex}`;
                                                            const names = Array.from(new Set(ammunitionChoices(equipment).map(c => c.item.name)));
                                                            const auto = weaponAmmunition({ ...itemObj, ammunition: undefined }, equipment);
                                                            const current = weaponAmmunition(itemObj, equipment);
                                                            const standard = standardAmmunition(itemObj);
                                                            const countOf = (name: string) => weaponAmmunition({ ...itemObj, ammunition: name }, equipment)?.count ?? 0;
                                                            const value = itemObj.ammunition === null ? 'none' : itemObj.ammunition || 'auto';
                                                            return (
                                                                <div style={{ marginTop: '0.5rem' }}>
                                                                    <label htmlFor={ammoId} style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ammunition</label>
                                                                    <select id={ammoId}
                                                                        className="input"
                                                                        value={value}
                                                                        onChange={e => handleUpdateItem(actualIndex, { ammunition: e.target.value === 'none' ? null : e.target.value === 'auto' ? '' : e.target.value })}
                                                                    >
                                                                        <option value="auto">{auto ? `Automatic: ${auto.name} (${auto.count})` : 'Automatic (none in your gear)'}</option>
                                                                        {names.map(n => <option key={n} value={n}>{n} ({countOf(n)})</option>)}
                                                                        {itemObj.ammunition && !names.includes(itemObj.ammunition) && (
                                                                            <option value={itemObj.ammunition}>{itemObj.ammunition} (not in your gear)</option>
                                                                        )}
                                                                        <option value="none">Don&apos;t track ammunition</option>
                                                                    </select>
                                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                                                        {current
                                                                            ? `Each attack roll in Actions spends one of your ${current.name}.`
                                                                            : itemObj.ammunition === null ? 'Ammunition isn’t tracked for this weapon.' : 'No ammunition for this weapon in your gear.'}
                                                                    </div>
                                                                    {!readOnly && itemObj.ammunition !== null && standard && (
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-secondary btn-sm"
                                                                            style={{ marginTop: '0.25rem' }}
                                                                            onClick={() => current && current.name.toLowerCase() === standard.item.toLowerCase()
                                                                                ? handleUpdateItem(current.index, { quantity: current.count + standard.bundle })
                                                                                : addAmmunition(standard.item, standard.bundle)}
                                                                        >
                                                                            + {standard.bundle} {standard.item}
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            );
                                                        })()}
                                                        {isWearable(itemObj) && (
                                                            <WornBonusEditor
                                                                index={actualIndex}
                                                                item={itemObj}
                                                                onChange={(wornBonus) => handleUpdateItem(actualIndex, { wornBonus })}
                                                            />
                                                        )}
                                                        {isWeapon(itemObj) && (
                                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
                                                                <div>
                                                                    <label htmlFor="equipmentmanager-damage" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Damage</label>
                                                                    <input id="equipmentmanager-damage"
                                                                        type="text"
                                                                        className="input"
                                                                        placeholder="e.g. 1d8"
                                                                        value={itemObj.damage || ''}
                                                                        onChange={e => handleUpdateItem(actualIndex, { damage: e.target.value })}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="equipmentmanager-damage-type" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Damage Type</label>
                                                                    <input id="equipmentmanager-damage-type"
                                                                        type="text"
                                                                        className="input"
                                                                        placeholder="e.g. slashing"
                                                                        value={itemObj.damageType || ''}
                                                                        onChange={e => handleUpdateItem(actualIndex, { damageType: e.target.value })}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                        </fieldset>
                                                    </div>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                    {equipment.length === 0 && (
                        <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.875rem' }}>No equipment</div>
                    )}
                </div>

                {(() => {
                    const total = gearValue(equipment);
                    return total.counted > 0 ? (
                        <p className="gear-value-total">
                            Value of your gear: <strong>{formatValue(total.copper)}</strong>
                            {' '}({total.counted} item{total.counted === 1 ? '' : 's'} with a value)
                        </p>
                    ) : null;
                })()}
                {equipment.length > 0 && (
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        marginTop: '0.75rem',
                        paddingTop: '0.75rem',
                        borderTop: isExpanded ? '1px solid var(--border)' : 'none'
                    }}>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setIsExpanded(!isExpanded)}
                            style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                        >
                            {isExpanded ? '▲ Collapse' : '▼ Expand'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

/** Adding a magic weapon, armor or shield that fits several base items: "Which weapon is your Flame Tongue?" */
function ChooseBase({ item, candidates, onChoose, onBack }: {
    item: CharacterItem;
    candidates: CharacterItem[];
    onChoose: (base: CharacterItem) => void;
    onBack: () => void;
}) {
    const [search, setSearch] = useState('');
    const kind = item.appliesTo?.kind ?? item.type ?? 'weapon';
    const shown = candidates.filter(c => c.name.toLowerCase().includes(search.trim().toLowerCase()));
    return (
        <div className="choose-base">
            <p className="choose-base-question">Which {kind} is your <strong>{item.name}</strong>?</p>
            {candidates.length > 8 && (
                <input
                    type="search"
                    className="input"
                    aria-label={`Search ${kind}s`}
                    placeholder={`Search ${kind}s`}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            )}
            <ul className="choose-base-list">
                {shown.map(c => (
                    <li key={c.name}>
                        <button type="button" className="choose-base-option" onClick={() => onChoose(c)}>
                            <span className="choose-base-name">{c.name}</span>
                            <span className="choose-base-stats">
                                {c.damage ? `${c.damage} ${c.damageType ?? ''}`.trim() : c.baseAC != null ? `AC ${c.baseAC}${c.category === 'shield' ? ' bonus' : ''}` : ''}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
            <button type="button" className="btn btn-secondary" onClick={onBack}>Back</button>
        </div>
    );
}

const BONUS_FIELDS: { key: 'ac' | 'saves' | 'attack' | 'damage'; label: string }[] = [
    { key: 'ac', label: 'AC' },
    { key: 'saves', label: 'Saving throws' },
    { key: 'attack', label: 'Weapon attack rolls' },
    { key: 'damage', label: 'Weapon damage rolls' },
];

/** A worn item's bonuses (Ring of Protection: +1 AC and saves): read from its text until set here. */
function WornBonusEditor({ index, item, onChange }: {
    index: number;
    item: CharacterItem;
    onChange: (bonus: WornBonus | null) => void;
}) {
    const detected = detectedWornBonus(item);
    const set = item.wornBonus ?? null;
    const current = set ?? detected;
    const idBase = `equipmentmanager-worn-${index}`;
    const update = (changes: Partial<WornBonus>) => {
        const next: WornBonus = { ...current, ...changes };
        // Drop empty fields so the stored bonus stays small
        (Object.keys(next) as (keyof WornBonus)[]).forEach((k) => {
            const v = next[k];
            if (v === undefined || v === 0 || v === false || (Array.isArray(v) && v.length === 0)) delete next[k];
        });
        onChange(next);
    };
    const summary = hasWornBonus(current) ? describeWornBonus(current) : 'No bonuses';
    return (
        <div style={{ marginTop: '0.5rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                While worn{item.attunement ? ' and attuned' : ''}: <strong style={{ color: 'var(--text)' }}>{summary}</strong>
                {' '}({set ? 'set by hand' : 'from the item'})
            </div>
            <div className="worn-bonus-grid" style={{ marginTop: '0.25rem' }}>
                {BONUS_FIELDS.map(({ key, label }) => (
                    <div key={key}>
                        <label htmlFor={`${idBase}-${key}`} style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{label}</label>
                        <select id={`${idBase}-${key}`}
                            className="input"
                            value={String(current[key] ?? 0)}
                            onChange={e => update({ [key]: Number(e.target.value) })}
                        >
                            <option value="0">None</option>
                            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>+{n}</option>)}
                        </select>
                    </div>
                ))}
            </div>
            {(current.attack || current.damage) ? (
                <div style={{ marginTop: '0.25rem' }}>
                    <label htmlFor={`${idBase}-weapons`} style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Only with these weapons (blank = any weapon)
                    </label>
                    <input id={`${idBase}-weapons`}
                        key={(current.weapons || []).join(',')}
                        type="text"
                        className="input"
                        placeholder="e.g. Longbow, Shortbow"
                        defaultValue={(current.weapons || []).map(w => w.replace(/\b\w/g, c => c.toUpperCase())).join(', ')}
                        onBlur={e => {
                            const weapons = e.target.value.split(',').map(w => w.trim().toLowerCase()).filter(Boolean);
                            if (weapons.join(',') !== (current.weapons || []).join(',')) update({ weapons });
                        }}
                    />
                </div>
            ) : null}
            {current.ac ? (
                <label className="checkbox-row" style={{ marginTop: '0.25rem', marginBottom: 0 }}>
                    <input
                        type="checkbox"
                        checked={!!current.unarmored}
                        onChange={e => update({ unarmored: e.target.checked })}
                    />
                    AC bonus only without armor or a shield
                </label>
            ) : null}
            {set && (
                <button type="button" className="btn btn-ghost btn-sm" style={{ marginTop: '0.25rem' }} onClick={() => onChange(null)}>
                    Use the item&apos;s text{hasWornBonus(detected) ? ` (${describeWornBonus(detected)})` : ''}
                </button>
            )}
        </div>
    );
}

function MarkdownHint({ id }: { id: string }) {
    return (
        <p id={id} className="markdown-hint">
            Markdown works: **bold**, *italic*, - lists, 1. numbered lists, # headings, | tables |.
        </p>
    );
}

/** An item's description, shown with its Markdown; the player can rewrite it (kept over the item list's text). */
function ItemDescription({ index, item, fromList, readOnly, onSave }: {
    index: number;
    item: CharacterItem;
    /** The item comes from the item list, whose text is shown until the player rewrites it */
    fromList: boolean;
    readOnly: boolean;
    onSave: (updates: Partial<CharacterItem>) => void;
}) {
    const [draft, setDraft] = useState<string | null>(null);
    const fieldId = `equipmentmanager-description-${index}`;
    if (draft !== null) {
        return (
            <div className="item-description-edit">
                <label htmlFor={fieldId} style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Description</label>
                <textarea id={fieldId}
                    className="input"
                    rows={6}
                    value={draft}
                    aria-describedby={`${fieldId}-hint`}
                    onChange={e => setDraft(e.target.value)}
                    autoFocus
                />
                <MarkdownHint id={`${fieldId}-hint`} />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button type="button" className="btn btn-sm" onClick={() => {
                        onSave({ description: draft, ...(fromList && { descriptionEdited: true }) });
                        setDraft(null);
                    }}>Save description</button>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => setDraft(null)}>Cancel</button>
                </div>
            </div>
        );
    }
    return (
        <div style={{ marginBottom: '0.5rem' }}>
            {item.description && <Markdown text={item.description} className="item-description" />}
            {!readOnly && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => setDraft(item.description || '')}>
                        {item.description ? 'Edit description' : 'Add description'}
                    </button>
                    {fromList && item.descriptionEdited && (
                        <button type="button" className="btn btn-ghost btn-sm" onClick={() => onSave({ descriptionEdited: false })}>
                            Use the item list&apos;s text
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
