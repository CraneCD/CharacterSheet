'use client';

import { useState, useEffect, useRef } from 'react';
import { api } from '@/lib/api';
import { CharacterItem, ItemCategory } from '@/lib/types';
import { getMasteryActionsForWeapon, getMasteryForWeapon } from '@/lib/weaponMastery';

interface EquipmentManagerProps {
    characterId: string;
    initialEquipment: (string | CharacterItem)[];
    onUpdate: (newEquipment: (string | CharacterItem)[]) => void;
    onEquipChange?: () => void;
    abilityScores?: { str: number; dex: number; con: number; int: number; wis: number; cha: number };
    proficiencyBonus?: number;
    existingActions?: any[];
    onCreateAction?: (action: any) => Promise<void>;
    hasWeaponMastery?: boolean;
    /** Weapons picked for Weapon Mastery (lowercase); null/undefined = every weapon (characters from before the choice existed). */
    masteryWeapons?: string[] | null;
    onDeleteMasteryActionsForWeapon?: (weaponName: string) => Promise<void>;
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
    hasWeaponMastery = false,
    masteryWeapons,
    onDeleteMasteryActionsForWeapon
}: EquipmentManagerProps) {
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
        return { ...item, name: live.name, description: live.description };
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

    const handleAddBaseItem = async (baseItem: CharacterItem) => {
        try {
            const itemToAdd: CharacterItem = {
                ...baseItem,
                baseItemId: baseItem.id,
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
        } catch (err) {
            console.error('Failed to add equipment', err);
            alert('Failed to add equipment');
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
            alert('Failed to add equipment');
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
            alert('Failed to remove equipment');
        }
    };

    const isArmor = (i: CharacterItem) => i.category === 'armor' || i.type === 'armor';
    const isShield = (i: CharacterItem) => i.category === 'shield' || i.type === 'shield';
    const isWeapon = (i: CharacterItem) => i.category === 'weapon' || i.type === 'weapon';
    const isEquipable = (i: CharacterItem) => isArmor(i) || isShield(i) || isWeapon(i);

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

        // Weapon attacks are shown only in the Attacks section (CombatManager). Do not create them as actions.
        // Handle Weapon Mastery actions on equip/unequip only.
        if (isWeapon(item)) {
            const masteryChosen = !masteryWeapons || masteryWeapons.includes(item.name.trim().toLowerCase());
            if (newEquipped && hasWeaponMastery && masteryChosen && onCreateAction) {
                const masteryActions = getMasteryActionsForWeapon(item.name);
                for (const ma of masteryActions) {
                    const exists = existingActions.some((a: any) => a.name === ma.name);
                    if (!exists) {
                        try {
                            await onCreateAction(ma);
                        } catch (err) {
                            console.error('Failed to create mastery action', err);
                        }
                    }
                }
            }
            if (!newEquipped && hasWeaponMastery && getMasteryForWeapon(item.name) && onDeleteMasteryActionsForWeapon) {
                try {
                    await onDeleteMasteryActionsForWeapon(item.name);
                } catch (err) {
                    console.error('Failed to remove mastery actions', err);
                }
            }
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
            alert('Action creation is not available');
            return;
        }
        
        try {
            const action = {
                name: `Use ${item.name}`,
                description: item.description || `Use the ${item.name}.`,
                type: 'action' as const
            };
            if (actionExists(action.name)) {
                alert(`"${action.name}" is already in your actions.`);
                return;
            }
            await onCreateAction(action);
            alert(`Action "${action.name}" created!`);
        } catch (err) {
            console.error('Failed to create action', err);
            alert('Failed to create action');
        }
    };

    const handleCreateMagicItemBonusAction = async (item: CharacterItem, index: number) => {
        if (!item.name) return;
        
        if (!onCreateAction) {
            alert('Action creation is not available');
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
                alert(`"${action.name}" is already in your actions.`);
                return;
            }
            await onCreateAction(action);
            alert(`Bonus Action "${action.name}" created!`);
        } catch (err) {
            console.error('Failed to create bonus action', err);
            alert('Failed to create bonus action');
        }
    };

    const categories: ItemCategory[] = ['armor', 'weapon', 'shield', 'tool', 'magic-item', 'potion', 'scroll', 'miscellaneous'];
    const safeBaseItems = Array.isArray(baseItems) ? baseItems : [];
    const filteredBaseItems = selectedCategory === 'custom'
        ? []
        : safeBaseItems.filter(item => {
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
                <button
                    className="button primary"
                    style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
                    onClick={() => setIsAdding(true)}
                >
                    + Add Item
                </button>
            </h3>

            {isAdding && (
                <div className="modal-overlay" onClick={() => {
                    setIsAdding(false);
                    setSearchTerm('');
                }}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                        <h3>Add Item</h3>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Select Category</label>
                            <select
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
                                    value={newCustomItem.description || ''}
                                    onChange={e => setNewCustomItem({ ...newCustomItem, description: e.target.value })}
                                    rows={3}
                                />
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    <button className="button primary" onClick={handleAddCustomItem}>Add</button>
                                    <button className="button secondary" onClick={() => setIsAdding(false)}>Cancel</button>
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
                                                    {item.description && (
                                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                                            {item.description.substring(0, 100)}{item.description.length > 100 ? '...' : ''}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                                <button 
                                    className="button secondary" 
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
                    </div>
                </div>
            )}

            <div style={{ position: 'relative' }}>
                <div 
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
                                                                onChange={() => handleEquipToggle(actualIndex, itemObj)}
                                                                title="Equipped?"
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
                                                            {itemObj.name} {itemObj.quantity && itemObj.quantity > 1 ? `(x${itemObj.quantity})` : ''}
                                                            {itemObj.equipped && ' ✓'}
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                        {itemObj.category === 'magic-item' && (
                                                            <>
                                                                <button
                                                                    className="button secondary"
                                                                    style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
                                                                    onClick={() => handleCreateMagicItemAction(itemObj, actualIndex)}
                                                                    title="Create Action"
                                                                >
                                                                    + Action
                                                                </button>
                                                                <button
                                                                    className="button secondary"
                                                                    style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
                                                                    onClick={() => handleCreateMagicItemBonusAction(itemObj, actualIndex)}
                                                                    title="Create Bonus Action"
                                                                >
                                                                    + Bonus
                                                                </button>
                                                            </>
                                                        )}
                                                        <button
                                                            className="button plain"
                                                            style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
                                                            onClick={() => setExpandedIndex(isItemExpanded ? null : actualIndex)}
                                                        >
                                                            {isItemExpanded ? 'Collapse' : 'Edit'}
                                                        </button>
                                                        <button
                                                            className="button plain"
                                                            style={{ color: 'var(--text-muted)', fontSize: '1.25rem', lineHeight: 1, padding: '0 0.5rem' }}
                                                            onClick={() => handleRemove(actualIndex)}
                                                            title="Remove"
                                                        >
                                                            &times;
                                                        </button>
                                                    </div>
                                                </div>

                                                {isItemExpanded && (
                                                    <div style={{ padding: '0.5rem', backgroundColor: 'var(--surface)', marginBottom: '0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>
                                                        {itemObj.description && (
                                                            <div style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                                                                {itemObj.description}
                                                            </div>
                                                        )}
                                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                            <div>
                                                                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Quantity</label>
                                                                <input
                                                                    type="text"
                                                                    inputMode="numeric"
                                                                    pattern="[0-9]*"
                                                                    className="input"
                                                                    value={editingQuantity[actualIndex] !== undefined 
                                                                        ? editingQuantity[actualIndex] 
                                                                        : (itemObj.quantity === 0 ? '' : (itemObj.quantity || 1).toString())}
                                                                    onChange={e => {
                                                                        const val = e.target.value;
                                                                        if (val === '' || /^\d+$/.test(val)) {
                                                                            setEditingQuantity({ ...editingQuantity, [actualIndex]: val });
                                                                        }
                                                                    }}
                                                                    onBlur={e => {
                                                                        const val = e.target.value;
                                                                        const quantity = val === '' ? 1 : (parseInt(val) || 1);
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
                                                            {(isArmor(itemObj) || isShield(itemObj)) && (
                                                                <div>
                                                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Base AC</label>
                                                                    <input
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
                                                                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Armor Type</label>
                                                                <select
                                                                    className="input"
                                                                    value={itemObj.armorMethod || 'light'}
                                                                    onChange={e => handleUpdateItem(actualIndex, { armorMethod: e.target.value as any })}
                                                                >
                                                                    <option value="light">Light (Dex)</option>
                                                                    <option value="medium">Medium (Max +2 Dex)</option>
                                                                    <option value="heavy">Heavy (No Dex)</option>
                                                                </select>
                                                            </div>
                                                        )}
                                                        {isWeapon(itemObj) && (
                                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
                                                                <div>
                                                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Damage</label>
                                                                    <input
                                                                        type="text"
                                                                        className="input"
                                                                        placeholder="e.g. 1d8"
                                                                        value={itemObj.damage || ''}
                                                                        onChange={e => handleUpdateItem(actualIndex, { damage: e.target.value })}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Damage Type</label>
                                                                    <input
                                                                        type="text"
                                                                        className="input"
                                                                        placeholder="e.g. slashing"
                                                                        value={itemObj.damageType || ''}
                                                                        onChange={e => handleUpdateItem(actualIndex, { damageType: e.target.value })}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
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

                {equipment.length > 0 && (
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        marginTop: '0.75rem',
                        paddingTop: '0.75rem',
                        borderTop: isExpanded ? '1px solid var(--border)' : 'none'
                    }}>
                        <button
                            className="button secondary"
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
