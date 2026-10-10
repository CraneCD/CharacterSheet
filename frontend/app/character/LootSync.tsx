'use client';

import { useCallback, useEffect, useRef } from 'react';
import { api } from '@/lib/api';
import { CharacterData, Currency } from '@/lib/types';
import { DENOMINATIONS } from '@/lib/loot';
import { usePolling } from '@/app/campaigns/usePolling';
import { useToast } from '@/app/components/ui';

type Equipment = CharacterData['equipment'];

interface LootSyncProps {
    characterId: string;
    equipment: Equipment;
    currency?: Currency;
    onChange: (updates: Partial<CharacterData>) => void;
}

const POLL_MS = 30_000;

/** How many things are listed, counting stacks */
const itemCount = (list: Equipment) =>
    list.reduce((n, e) => n + (typeof e === 'string' ? 1 : Math.max(1, Number(e?.quantity) || 1)), 0);

/**
 * Loot the DM hands out (or a share a player takes) is written to the sheet
 * by the server. This picks it up on an open sheet: every 30 seconds while
 * the tab is visible, it checks the saved equipment and currency and shows
 * anything new. Renders nothing; only used for characters in a campaign.
 */
export default function LootSync({ characterId, equipment, currency, onChange }: LootSyncProps) {
    const toast = useToast();
    const local = useRef({ equipment, currency });
    useEffect(() => {
        local.current = { equipment, currency };
    }, [equipment, currency]);

    const check = useCallback(async () => {
        try {
            const character = await api.get(`/characters/${characterId}`);
            const saved = character?.data ?? {};
            const savedEquipment: Equipment = Array.isArray(saved.equipment) ? saved.equipment : [];
            const savedCurrency: Currency | undefined = saved.currency;
            const { equipment: mine, currency: myCurrency } = local.current;
            const sameEquipment = JSON.stringify(savedEquipment) === JSON.stringify(mine);
            const sameCurrency = DENOMINATIONS.every((d) => (Number(savedCurrency?.[d]) || 0) === (Number(myCurrency?.[d]) || 0));
            if (sameEquipment && sameCurrency) return;

            const gotItems = itemCount(savedEquipment) > itemCount(mine);
            const gotCoins = DENOMINATIONS.some((d) => (Number(savedCurrency?.[d]) || 0) > (Number(myCurrency?.[d]) || 0));
            onChange({ equipment: savedEquipment, ...(savedCurrency ? { currency: savedCurrency } : {}) });
            if (gotItems || gotCoins) toast.info('New loot is on your sheet.');
        } catch {
            // Offline or signed out: the next check (or a reload) catches up
        }
    }, [characterId, onChange, toast]);

    usePolling(check, POLL_MS);
    return null;
}
