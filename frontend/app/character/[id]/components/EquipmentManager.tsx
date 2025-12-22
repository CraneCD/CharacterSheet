'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { CharacterItem, ItemCategory } from '@/lib/types';

interface EquipmentManagerProps {
    characterId: string;
    initialEquipment: (string | CharacterItem)[];
    onUpdate: (newEquipment: (string | CharacterItem)[]) => void;
    onEquipChange?: () => void; // Callback when equipment changes (for AC recalculation)
    abilityScores?: { str: number; dex: number; con: number; int: number; wis: number; cha: number };
    proficiencyBonus?: number;
    existingActions?: any[]; // To check if weapon action already exists
    onCreateAction?: (action: any) => Promise<void>; // Callback to create action
}

export default function EquipmentManager({ 
    characterId, 
    initialEquipment, 
    onUpdate, 
    onEquipChange,
    abilityScores = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    proficiencyBonus = 2,
    existingActions = [],
    onCreateAction
}: EquipmentManagerProps) {
    const [equipment, setEquipment] = useState<(string | CharacterItem)[]>(initialEquipment || []);
    const [baseItems, setBaseItems] = useState<CharacterItem[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'custom'>('custom');
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newCustomItem, setNewCustomItem] = useState<Partial<CharacterItem>>({
        name: '',
        category: 'miscellaneous',
        quantity: 1
    });

    useEffect(() => {
        setEquipment(initialEquipment || []);
    }, [initialEquipment]);

    useEffect(() => {
        const fetchBaseItems = async () => {
            try {
                const data = await api.get('/reference/base-items');
                setBaseItems(data);
            } catch (err) {
                console.error('Failed to fetch base items', err);
            }
        };
        fetchBaseItems();
    }, []);

    const handleAddBaseItem = async (baseItem: CharacterItem) => {
        try {
            const itemToAdd: CharacterItem = {
                ...baseItem,
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

    const generateWeaponActionDescription = (weapon: CharacterItem): string => {
        const mod = (score: number) => Math.floor((score - 10) / 2);
        const formatMod = (m: number) => m >= 0 ? `+${m}` : `${m}`;
        
        // Determine ability modifier (finesse uses Dex or Str, otherwise melee uses Str, ranged uses Dex)
        const hasFinesse = weapon.properties?.includes('finesse');
        const isRanged = weapon.properties?.some(p => p.includes('ammunition') || p.includes('thrown'));
        const abilityMod = hasFinesse 
            ? Math.max(mod(abilityScores.str), mod(abilityScores.dex))
            : isRanged 
                ? mod(abilityScores.dex)
                : mod(abilityScores.str);
        
        const attackMod = abilityMod + proficiencyBonus;
        const damageMod = abilityMod;
        
        const damage = weapon.damage || '1d4';
        const damageType = weapon.damageType || 'bludgeoning';
        const properties = weapon.properties?.join(', ') || '';
        
        let description = `**Melee/Ranged Weapon Attack:** ${formatMod(attackMod)} to hit`;
        if (weapon.properties?.some(p => p.includes('range'))) {
            description += ', range varies';
        }
        description += `\n**Hit:** ${damage}`;
        if (damageMod !== 0) {
            description += ` ${formatMod(damageMod)}`;
        }
        description += ` ${damageType} damage`;
        if (properties) {
            description += `\n**Properties:** ${properties}`;
        }
        
        return description;
    };

    const handleEquipToggle = async (index: number, item: CharacterItem) => {
        const newEquipped = !item.equipped;
        
        // Handle exclusive equipment (only one armor, one shield can be equipped)
        if (newEquipped && (item.category === 'armor' || item.category === 'shield')) {
            const newEquipment = [...equipment];
            newEquipment.forEach((eq, i) => {
                if (i !== index && typeof eq !== 'string') {
                    const eqItem = eq as CharacterItem;
                    if (eqItem.category === item.category && eqItem.equipped) {
                        eqItem.equipped = false;
                    }
                }
            });
            setEquipment(newEquipment);
        }

        // Handle weapon action creation/removal
        if (item.category === 'weapon' || item.type === 'weapon') {
            const weaponActionName = `${item.name} Attack`;
            const existingAction = existingActions.find(a => a.name === weaponActionName);
            
            if (newEquipped && !existingAction && onCreateAction) {
                // Create weapon action
                const actionDescription = generateWeaponActionDescription(item);
                const action = {
                    name: weaponActionName,
                    description: actionDescription,
                    type: 'action'
                };
                try {
                    await onCreateAction(action);
                } catch (err) {
                    console.error('Failed to create weapon action', err);
                }
            }
            // Note: We don't auto-remove actions when unequipping, user can remove manually if desired
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
            const action = {
                name: `Use ${item.name}`,
                description: item.description || `Use the ${item.name}.`,
                type: 'bonus' as const
            };
            await onCreateAction(action);
            alert(`Bonus Action "${action.name}" created!`);
        } catch (err) {
            console.error('Failed to create bonus action', err);
            alert('Failed to create bonus action');
        }
    };

    const categories: ItemCategory[] = ['armor', 'weapon', 'shield', 'magic-item', 'potion', 'scroll', 'miscellaneous'];
    const filteredBaseItems = selectedCategory === 'custom' 
        ? [] 
        : baseItems.filter(item => {
            if (item.category !== selectedCategory) return false;
            if (!searchTerm.trim()) return true;
            const searchLower = searchTerm.toLowerCase();
            return (
                item.name.toLowerCase().includes(searchLower) ||
                (item.description && item.description.toLowerCase().includes(searchLower)) ||
                (item.type && item.type.toLowerCase().includes(searchLower)) ||
                (item.properties && item.properties.some(p => p.toLowerCase().includes(searchLower)))
            );
        });

    // Group equipment by category
    const equipmentByCategory = categories.reduce((acc, cat) => {
        acc[cat] = equipment.filter((item, i) => {
            const itemObj = typeof item === 'string' ? { name: item, category: 'miscellaneous' as ItemCategory } : item;
            return (itemObj.category || 'miscellaneous') === cat;
        });
        return acc;
    }, {} as Record<ItemCategory, (string | CharacterItem)[]>);

    return (
        <div className="card">
            <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Equipment
                <button
                    className="button plain"
                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
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
                        const categoryItems = equipmentByCategory[category];
                        if (categoryItems.length === 0) return null;

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
                                    {categoryItems.map((item, i) => {
                                        // Find the actual index in the full equipment array
                                        let actualIndex = -1;
                                        let foundCount = 0;
                                        equipment.forEach((eq, idx) => {
                                            const itemObj = typeof item === 'string' ? { name: item, category: category as ItemCategory } : item;
                                            const eqObj = typeof eq === 'string' ? { name: eq } : eq;
                                            const eqCategory = (eqObj as CharacterItem).category || 'miscellaneous';
                                            if (itemObj.name === eqObj.name && eqCategory === category) {
                                                if (foundCount === i) {
                                                    actualIndex = idx;
                                                }
                                                foundCount++;
                                            }
                                        });
                                        if (actualIndex === -1) actualIndex = i; // Fallback
                                        const itemObj = typeof item === 'string' ? { name: item, category: 'miscellaneous' as ItemCategory } : item;
                                        const isItemExpanded = expandedIndex === actualIndex;

                                        return (
                                            <li key={actualIndex} style={{ borderBottom: '1px solid var(--border)', marginBottom: '0.5rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                                                        {(itemObj.category === 'armor' || itemObj.category === 'shield' || itemObj.category === 'weapon') && (
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
                                                                    className="button plain"
                                                                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                                                                    onClick={() => handleCreateMagicItemAction(itemObj, actualIndex)}
                                                                    title="Create Action"
                                                                >
                                                                    + Action
                                                                </button>
                                                                <button
                                                                    className="button plain"
                                                                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
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
                                                                    value={itemObj.quantity === 0 ? '' : (itemObj.quantity || 1).toString()}
                                                                    onChange={e => {
                                                                        const val = e.target.value;
                                                                        if (val === '' || /^\d+$/.test(val)) {
                                                                            const quantity = val === '' ? 0 : parseInt(val);
                                                                            handleUpdateItem(actualIndex, { quantity: quantity || 1 });
                                                                        }
                                                                    }}
                                                                    onBlur={e => {
                                                                        if (e.target.value === '') {
                                                                            handleUpdateItem(actualIndex, { quantity: 1 });
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                            {(itemObj.category === 'armor' || itemObj.category === 'shield') && (
                                                                <div>
                                                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Base AC</label>
                                                                    <input
                                                                        type="text"
                                                                        inputMode="numeric"
                                                                        pattern="[0-9]*"
                                                                        className="input"
                                                                        value={(() => {
                                                                            const ac = itemObj.baseAC || (itemObj.category === 'shield' ? 2 : 11);
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
                                                                                handleUpdateItem(actualIndex, { baseAC: itemObj.category === 'shield' ? 2 : 11 });
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                        {itemObj.category === 'armor' && (
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
                                                        {itemObj.category === 'weapon' && (
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
