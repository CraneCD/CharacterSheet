'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { CharacterData } from '@/lib/types';
import { getCharacterSubclasses, getClassLevels, getSubclassMap } from '@/lib/subclasses';
import { describeError, useOptimisticSave } from '@/app/components/ui/useOptimisticSave';

export interface GameData {
    races: any[];
    classes: any[];
    backgrounds: any[];
    subclasses: any[];
    traits?: { [key: string]: { name: string; description: string } };
}

export interface ClassFeature {
    level: number;
    name: string;
    description: string;
    /** e.g. "Class: Wizard" or "Subclass: Evoker" (set for the sheet's feature lists). */
    source?: string;
}

// Module-level cache: reference data is static per session — no need to re-fetch on navigation
let referenceDataCache: GameData | null = null;

/**
 * Loads the character, the static reference data (cached per session), and
 * the class/subclass feature lists derived from the character's classes.
 */
export function useCharacterSheetData(id: string | string[] | undefined) {
    const [character, setCharacter] = useState<any>(null);
    const [gameData, setGameData] = useState<GameData | null>(null);
    const [classFeaturesList, setClassFeaturesList] = useState<ClassFeature[]>([]);
    const [subclassFeaturesList, setSubclassFeaturesList] = useState<ClassFeature[]>([]);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [reloadCount, setReloadCount] = useState(0);
    const optimisticSave = useOptimisticSave();

    const handleUpdateCharacter = useCallback((updates: Partial<CharacterData>) => {
        setCharacter((prev: any) => ({
            ...prev,
            data: { ...prev.data, ...updates }
        }));
    }, []);

    /**
     * Save sheet data: shows the change immediately, PATCHes it, and on failure puts back
     * the previous values (unless something newer replaced them) and shows an error toast.
     * Resolves to the updated character from the server, or undefined if the save failed.
     */
    const persistData = useCallback((updates: Partial<CharacterData>, errorMessage: string) => {
        const keys = Object.keys(updates) as (keyof CharacterData)[];
        let previous: Partial<CharacterData> | null = null;
        return optimisticSave({
            apply: () => setCharacter((prev: any) => {
                if (previous === null) {
                    previous = {};
                    for (const key of keys) (previous as any)[key] = prev?.data?.[key];
                }
                return { ...prev, data: { ...prev.data, ...updates } };
            }),
            rollback: () => setCharacter((prev: any) => {
                if (!prev || !previous) return prev;
                const restored = { ...prev.data };
                for (const key of keys) {
                    if (restored[key] === updates[key]) restored[key] = (previous as any)[key];
                }
                return { ...prev, data: restored };
            }),
            request: () => api.patch(`/characters/${character?.id}/data`, updates),
            errorMessage,
        });
    }, [optimisticSave, character?.id]);

    const reload = useCallback(() => {
        setLoadError(null);
        setReloadCount((n) => n + 1);
    }, []);

    useEffect(() => {
        const charId = Array.isArray(id) ? id?.[0] : id;
        if (!charId) return;
        const loadData = async () => {
            try {
                if (referenceDataCache) {
                    const char = await api.get(`/characters/${charId}`);
                    setCharacter(char);
                    setGameData(referenceDataCache);
                } else {
                    const [char, races, classes, backgrounds, subclasses, traits] = await Promise.all([
                        api.get(`/characters/${charId}`),
                        api.get('/reference/races'),
                        api.get('/reference/classes'),
                        api.get('/reference/backgrounds'),
                        api.get('/reference/subclasses'),
                        api.get('/reference/traits')
                    ]);
                    const gameData: GameData = {
                        races: Array.isArray(races) ? races : [],
                        classes: Array.isArray(classes) ? classes : [],
                        backgrounds: Array.isArray(backgrounds) ? backgrounds : [],
                        subclasses: Array.isArray(subclasses) ? subclasses : [],
                        traits: traits && typeof traits === 'object' ? traits : undefined
                    };
                    referenceDataCache = gameData;
                    setCharacter(char);
                    setGameData(gameData);
                }
            } catch (err) {
                console.error('Failed to load character sheet', err);
                setLoadError(describeError("Couldn't load this character", err));
            }
        };
        loadData();
    }, [id, reloadCount]);

    // Load class and subclass features when character data is available
    useEffect(() => {
        if (!character || !gameData) return;

        const loadFeatures = async () => {
            try {
                const data = character.data || {};
                const classesData = data.classes || {};

                // Get all classes
                const cls = character.class || character.classId || 'fighter';
                const characterClasses = Object.keys(classesData).length > 0
                    ? Object.entries(classesData).map(([classId, level]: [string, any]) => ({ id: classId, level }))
                    : [{ id: (cls || '').toLowerCase(), level: character.level ?? 1 }];

                // Load features for all classes in parallel
                const featureResults = await Promise.all(
                    characterClasses.map(cls =>
                        api.get(`/reference/class-features/${cls.id}`)
                            .then((features: ClassFeature[]) => {
                                const className = (gameData.classes || []).find((c: any) => (c?.id || '').toLowerCase() === cls.id.toLowerCase())?.name || cls.id;
                                return (Array.isArray(features) ? features : [])
                                    .filter(f => f.level <= cls.level)
                                    .map(f => ({ ...f, source: `Class: ${className}` }));
                            })
                            .catch((err: unknown) => {
                                console.error(`Failed to load features for ${cls.id}`, err);
                                return [] as ClassFeature[];
                            })
                    )
                );
                const allClassFeatures: ClassFeature[] = featureResults.flat();

                setClassFeaturesList(allClassFeatures);

                // Subclass features for every class with a subclass, each up to that class's level
                const primaryClassId = (cls || '').toLowerCase();
                const allSubclasses = gameData.subclasses || [];
                const characterSubclasses = getCharacterSubclasses(
                    getSubclassMap(data, allSubclasses, primaryClassId),
                    getClassLevels(data, primaryClassId, character.level ?? 1),
                    allSubclasses
                );
                setSubclassFeaturesList(characterSubclasses.flatMap(({ subclass, classLevel }) =>
                    (subclass.features || [])
                        .filter((f: ClassFeature) => f.level <= classLevel)
                        .map((f: ClassFeature) => ({ ...f, source: `Subclass: ${subclass.name}` }))));
            } catch (err) {
                console.error('Failed to load class features', err);
                setClassFeaturesList([]);
                setSubclassFeaturesList([]);
            }
        };

        loadFeatures();
    }, [character, gameData]);

    return { character, setCharacter, handleUpdateCharacter, persistData, gameData, classFeaturesList, subclassFeaturesList, loadError, reload };
}
