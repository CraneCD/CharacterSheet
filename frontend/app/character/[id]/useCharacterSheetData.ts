'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { CharacterData } from '@/lib/types';

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

    const handleUpdateCharacter = useCallback((updates: Partial<CharacterData>) => {
        setCharacter((prev: any) => ({
            ...prev,
            data: { ...prev.data, ...updates }
        }));
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
                console.error(err);
            }
        };
        loadData();
    }, [id]);

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
                            .then((features: ClassFeature[]) =>
                                (Array.isArray(features) ? features : []).filter(f => f.level <= cls.level)
                            )
                            .catch((err: unknown) => {
                                console.error(`Failed to load features for ${cls.id}`, err);
                                return [] as ClassFeature[];
                            })
                    )
                );
                const allClassFeatures: ClassFeature[] = featureResults.flat();

                setClassFeaturesList(allClassFeatures);

                // Load subclass features if character has a subclass (for now, only primary class)
                if (data.subclassId) {
                    const subclass = (gameData.subclasses || []).find((s: any) => (s?.id || '') === data.subclassId);
                    if (subclass) {
                        const primaryClassLevel = characterClasses[0]?.level ?? character.level ?? 1;
                        const subclassFeatures = subclass.features || [];
                        const availableSubclassFeatures = subclassFeatures.filter((f: ClassFeature) => f.level <= primaryClassLevel);
                        setSubclassFeaturesList(availableSubclassFeatures);
                    } else {
                        setSubclassFeaturesList([]);
                    }
                } else {
                    setSubclassFeaturesList([]);
                }
            } catch (err) {
                console.error('Failed to load class features', err);
                setClassFeaturesList([]);
                setSubclassFeaturesList([]);
            }
        };

        loadFeatures();
    }, [character, gameData]);

    return { character, setCharacter, handleUpdateCharacter, gameData, classFeaturesList, subclassFeaturesList };
}
