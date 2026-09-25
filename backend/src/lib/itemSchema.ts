import { z } from 'zod';

const coinAmount = z.number().int().min(0).max(10_000_000);

/** Coins by denomination; any can be left out. */
export const coinsSchema = z.object({ pp: coinAmount, gp: coinAmount, ep: coinAmount, sp: coinAmount, cp: coinAmount }).partial().strict();

/** A loot item's fields (CampaignItem), shared by the loot routes and prep files. */
export const itemFields = {
    name: z.string().trim().min(1, 'Give the item a name').max(150),
    description: z.string().max(4000).optional(),
    rarity: z.string().trim().max(40).optional(),
    quantity: z.number().int().min(1).max(9999).optional(),
    value: z.string().trim().max(60).optional(),
    revealed: z.boolean().optional(),
    dmNotes: z.string().max(4000).optional(),
    /** Set for currency: the coins in the pile. */
    coins: coinsSchema.nullable().optional(),
};
