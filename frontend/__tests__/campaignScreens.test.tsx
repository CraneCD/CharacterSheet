import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import CampaignsPage from '@/app/campaigns/page';
import CampaignPage from '@/app/campaigns/[id]/page';
import EncounterPage from '@/app/campaigns/[id]/encounters/[encounterId]/page';
import HPManager from '@/app/character/[id]/components/HPManager';
import SkillsCard from '@/app/character/[id]/components/sections/SkillsCard';
import { SheetReadOnlyProvider } from '@/app/character/[id]/SheetReadOnly';
import { ToastProvider } from '@/app/components/ui/Toast';
import { api } from '@/lib/api';
import LootPanel from '@/app/campaigns/[id]/components/LootPanel';
import SessionsPanel from '@/app/campaigns/[id]/components/SessionsPanel';
import ImportPrepDialog from '@/app/campaigns/components/ImportPrepDialog';
import CurrencyManager from '@/app/character/[id]/components/CurrencyManager';
import LootSync from '@/app/character/[id]/LootSync';

const push = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push, replace: jest.fn() }),
    usePathname: () => '/campaigns',
    useParams: () => ({ id: 'camp-1', encounterId: 'enc-1' }),
}));
jest.mock('@/lib/api', () => ({
    api: { get: jest.fn(), post: jest.fn(), put: jest.fn(), patch: jest.fn(), delete: jest.fn() },
    ApiError: class ApiError extends Error {
        constructor(message: string, readonly status: number) { super(message); }
    },
}));

const mockApi = api as unknown as Record<'get' | 'post' | 'put' | 'patch' | 'delete', jest.Mock>;

const ireena = {
    id: 'char-1', userId: 'p1', name: 'Ireena', race: 'human', class: 'fighter', level: 3,
    hp: { current: 9, max: 28, temp: 0 }, conditions: ['Poisoned'], exhaustion: 0, languages: [],
    derivedStats: { ac: 16, speed: 30, initiative: 1, passivePerception: 13, passiveInsight: 11, passiveInvestigation: 10 },
};
const dmCampaign = {
    id: 'camp-1', name: 'Curse of Strahd', description: 'Gothic horror', role: 'dm', dm: { id: 'dm', name: 'Dana' },
    joinCode: 'ABC234', notes: 'Strahd is watching', members: [{ userId: 'p1', name: 'Pat', joinedAt: '2026-09-01T00:00:00Z' }],
    party: [ireena], activeEncounter: null, createdAt: '2026-09-01T00:00:00Z', updatedAt: '2026-09-01T00:00:00Z',
};
const playerCampaign = {
    ...dmCampaign, role: 'player', joinCode: undefined, notes: undefined,
    party: [{ id: 'char-1', userId: 'p1', name: 'Ireena', race: 'human', class: 'fighter', level: 3, isMine: true }],
    activeEncounter: {
        id: 'enc-1', name: 'Ambush', round: 2, combatants: [
            { id: 'a', name: 'Ireena', kind: 'pc', characterId: 'char-1', initiative: 15, isCurrent: false },
            { id: 'b', name: 'Zombie', kind: 'monster', initiative: 8, isCurrent: true, health: 'bloodied' },
        ],
    },
};
const zombie = {
    id: 'zombie', name: 'Zombie', size: 'Medium', type: 'Undead', ac: 8, hp: 15, hitDice: '2d8+6', speed: '20 ft.', initiative: -2,
    abilities: { str: 13, dex: 6, con: 16, int: 3, wis: 6, cha: 5 }, cr: '1/4',
    actions: [{ name: 'Slam', description: 'Melee Attack Roll: +3. Hit: 5 (1d8 + 1) Bludgeoning damage.', attackBonus: 3, damage: '1d8+1' }],
};
const encounter = {
    id: 'enc-1', name: 'Ambush', status: 'planned', data: {
        round: 0, turn: 0, combatants: [
            { id: 'pc1', kind: 'pc', name: 'Ireena', characterId: 'char-1', initiative: 12, initiativeBonus: 1 },
            { id: 'z1', kind: 'monster', name: 'Zombie', monsterId: 'zombie', monsterSource: 'srd', initiative: null, initiativeBonus: -2, ac: 8, hp: { current: 15, max: 15, temp: 0 }, xp: 50 },
        ],
    },
};

function routeGets(routes: Record<string, unknown>) {
    mockApi.get.mockImplementation(async (url: string) => {
        if (url in routes) return routes[url];
        throw new Error(`Unexpected GET ${url}`);
    });
}

const renderWithToasts = (ui: React.ReactElement) => render(<ToastProvider>{ui}</ToastProvider>);

beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify({ id: 'p1' }));
    window.location.hash = '';
});

describe('campaign list', () => {
    it('splits the campaigns you run from the ones you play in', async () => {
        routeGets({
            '/campaigns': [
                { id: 'a', name: 'Strahd', description: null, role: 'dm', dmName: 'Me', memberCount: 3, characterCount: 3, myCharacters: [], activeEncounter: { id: 'e', name: 'Fight' }, updatedAt: '' },
                { id: 'b', name: 'Phandelver', description: 'Mines', role: 'player', dmName: 'Sam', memberCount: 4, characterCount: 4, myCharacters: [{ id: 'c', name: 'Tordek' }], activeEncounter: null, updatedAt: '' },
            ],
        });
        renderWithToasts(<CampaignsPage />);
        const running = await screen.findByRole('region', { name: 'Campaigns you run' });
        expect(within(running).getByText('Strahd')).toBeInTheDocument();
        expect(within(running).getByText('In combat')).toBeInTheDocument();
        const playing = screen.getByRole('region', { name: 'Campaigns you play in' });
        expect(within(playing).getByText(/Playing Tordek/)).toBeInTheDocument();
    });

    it('joins with a code and a character', async () => {
        routeGets({ '/campaigns': [], '/characters': [{ id: 'c1', name: 'Tordek', class: 'fighter', level: 2, campaign: { id: 'x', name: 'Old Game' } }] });
        mockApi.post.mockResolvedValue({ campaign: { id: 'camp-9', name: 'New Game' } });
        renderWithToasts(<CampaignsPage />);
        fireEvent.click((await screen.findAllByRole('button', { name: 'Join with a code' }))[0]);
        fireEvent.change(screen.getByLabelText('Join code'), { target: { value: 'abc234' } });
        const select = await screen.findByLabelText('Bring a character');
        await screen.findByRole('option', { name: /Tordek/ });
        fireEvent.change(select, { target: { value: 'c1' } });
        expect(screen.getByText('Tordek will leave Old Game.')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Join' }));
        await waitFor(() => expect(mockApi.post).toHaveBeenCalledWith('/campaigns/join', { joinCode: 'ABC234', characterId: 'c1' }));
        expect(push).toHaveBeenCalledWith('/campaigns/camp-9');
    });
});

describe('campaign hub', () => {
    it('gives the DM party HP, AC and conditions, the join code and DM-only tabs', async () => {
        routeGets({ '/campaigns/camp-1': dmCampaign });
        renderWithToasts(<CampaignPage />);
        expect(await screen.findByRole('heading', { name: 'Curse of Strahd' })).toBeInTheDocument();
        expect(screen.getByText('9/28 HP')).toBeInTheDocument();
        expect(screen.getByText('Poisoned')).toBeInTheDocument();
        expect(screen.getByText('ABC-234')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Open Ireena's sheet/ })).toHaveAttribute('href', '/character/char-1');
        expect(screen.getAllByRole('tab').map((t) => t.textContent)).toEqual(['Party', 'Sessions', 'Encounters', 'Loot', 'Bestiary', 'Notes']);
    });

    it("shows players the party and the turn order, but not the DM's tools", async () => {
        routeGets({ '/campaigns/camp-1': playerCampaign });
        renderWithToasts(<CampaignPage />);
        expect(await screen.findByRole('heading', { name: 'Curse of Strahd' })).toBeInTheDocument();
        expect(screen.queryByText('ABC-234')).not.toBeInTheDocument();
        expect(screen.getAllByRole('tab').map((t) => t.textContent)).toEqual(['Party', 'Sessions', 'Loot']);
        const order = screen.getByRole('region', { name: /In combat: Ambush/ });
        expect(within(order).getByText('Round 2')).toBeInTheDocument();
        expect(within(order).getByText('Zombie').closest('li')).toHaveAttribute('aria-current', 'step');
        expect(within(order).getByText('Bloodied')).toBeInTheDocument();
    });

    it('lets a player leave, which sends them back to the campaign list', async () => {
        routeGets({ '/campaigns/camp-1': playerCampaign });
        mockApi.delete.mockResolvedValue({});
        renderWithToasts(<CampaignPage />);
        fireEvent.click(await screen.findByRole('button', { name: 'Campaign actions' }));
        fireEvent.click(screen.getByRole('menuitem', { name: 'Leave campaign…' }));
        fireEvent.click(screen.getByRole('button', { name: 'Leave' }));
        await waitFor(() => expect(mockApi.delete).toHaveBeenCalledWith('/campaigns/camp-1/members/p1'));
        expect(push).toHaveBeenCalledWith('/campaigns');
    });
});

describe('combat tracker', () => {
    beforeEach(() => {
        routeGets({
            '/campaigns/camp-1/encounters/enc-1': encounter,
            '/campaigns/camp-1': dmCampaign,
            '/reference/monsters': [zombie],
            '/monsters': [],
        });
        mockApi.put.mockResolvedValue({});
    });

    it('rates the fight against the party and shows the stat block', async () => {
        renderWithToasts(<EncounterPage />);
        expect(await screen.findByDisplayValue('Ambush')).toBeInTheDocument();
        // One level 3 character: Low 150, Moderate 225; one zombie is 50 XP
        const difficulty = screen.getByRole('region', { name: 'Difficulty' });
        expect(within(difficulty).getByText('Low', { selector: 'strong' })).toHaveClass('difficulty-low');
        expect(await screen.findByRole('button', { name: /Roll Zombie: Slam/ })).toBeInTheDocument();
    });

    it('starts combat, rolls for monsters, runs turns and saves as it goes', async () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.5); // d20 = 11, zombie 11 - 2 = 9
        renderWithToasts(<EncounterPage />);
        fireEvent.click(await screen.findByRole('button', { name: 'Start combat' }));
        expect(screen.getByText("Round 1 · Ireena's turn")).toBeInTheDocument();
        await waitFor(() => expect(mockApi.put).toHaveBeenCalledWith('/campaigns/camp-1/encounters/enc-1', expect.objectContaining({ status: 'active' })));
        const saved = mockApi.put.mock.calls.at(-1)![1];
        expect(saved.data.combatants.map((c: any) => [c.name, c.initiative])).toEqual([['Ireena', 12], ['Zombie', 9]]);

        fireEvent.click(screen.getByRole('button', { name: 'Next turn ▶' }));
        expect(screen.getByText("Round 1 · Zombie's turn")).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Next turn ▶' }));
        expect(screen.getByText("Round 2 · Ireena's turn")).toBeInTheDocument();
        (Math.random as jest.Mock).mockRestore();
        await screen.findByText('Saved');
    });

    it('damages monsters through to 0 and marks them defeated', async () => {
        renderWithToasts(<EncounterPage />);
        const amount = await screen.findByLabelText('Damage or healing for Zombie');
        fireEvent.change(amount, { target: { value: '6' } });
        fireEvent.click(screen.getByRole('button', { name: 'Damage Zombie' }));
        expect(screen.getByText('9/15')).toBeInTheDocument();
        await act(async () => {
            fireEvent.change(amount, { target: { value: '20' } });
            fireEvent.keyDown(amount, { key: 'Enter' });
        });
        expect(screen.getByText('0/15')).toBeInTheDocument();
        await waitFor(() => {
            const last = mockApi.put.mock.calls.at(-1)![1];
            expect(last.data.combatants[1]).toMatchObject({ hp: { current: 0 }, defeated: true });
        });
        await screen.findByText('Saved');
    });
});

describe('loot', () => {
    const party = [{ id: 'char-1', userId: 'p1', name: 'Ireena', race: 'human', class: 'fighter', level: 3 }];
    const ring = { id: 'i1', campaignId: 'camp-1', name: 'Ring of Warmth', description: 'Keeps you cozy', rarity: 'uncommon', quantity: 1, value: '', revealed: true, heldBy: 'char-1', dmNotes: 'From the dragon', createdAt: '', updatedAt: '' };
    const potion = { ...ring, id: 'i2', name: 'Potion of Healing', rarity: 'common', quantity: 2, value: '50 gp', revealed: false, heldBy: null, dmNotes: '' };

    it('shows the DM found and not-yet-found loot, and reveals items', async () => {
        routeGets({ '/campaigns/camp-1/items': [ring, potion] });
        mockApi.put.mockResolvedValue({ ...potion, revealed: true });
        renderWithToasts(<LootPanel campaignId="camp-1" isDm party={party} />);
        expect(await screen.findByText('Ring of Warmth')).toBeInTheDocument();
        expect(screen.getByText('Uncommon · Held by Ireena')).toBeInTheDocument();
        expect(screen.getByText('From the dragon')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Not found yet/ })).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Reveal' }));
        await waitFor(() => expect(mockApi.put).toHaveBeenCalledWith('/campaigns/camp-1/items/i2', { revealed: true }));
        expect(screen.queryByRole('heading', { name: /Not found yet/ })).not.toBeInTheDocument();
    });

    it('shows players what the party has found, with no DM controls', async () => {
        routeGets({ '/campaigns/camp-1/items': [{ ...ring, dmNotes: undefined }] });
        renderWithToasts(<LootPanel campaignId="camp-1" isDm={false} party={party} />);
        expect(await screen.findByText('Ring of Warmth')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /Add item|Reveal|Hide/ })).not.toBeInTheDocument();
    });

    const coins = { ...potion, id: 'i3', name: 'Vault Coins', rarity: '', quantity: 1, value: '', revealed: true, coins: { gp: 350, sp: 189 } };
    const twoPlayers = [
        { id: 'char-1', userId: 'p1', name: 'Ireena', race: 'human', class: 'fighter', level: 3, isMine: true },
        { id: 'char-2', userId: 'p2', name: 'Ismark', race: 'human', class: 'fighter', level: 3, isMine: false },
    ];

    it('lets a player claim a found item straight onto their sheet', async () => {
        routeGets({ '/campaigns/camp-1/items': [{ ...potion, quantity: 1, revealed: true, dmNotes: undefined }] });
        mockApi.post.mockResolvedValue({ given: [{ characterId: 'char-1', name: 'Ireena' }] });
        renderWithToasts(<LootPanel campaignId="camp-1" isDm={false} party={twoPlayers} />);
        fireEvent.click(await screen.findByRole('button', { name: 'Claim Potion of Healing' }));
        await waitFor(() => expect(mockApi.post).toHaveBeenCalledWith('/campaigns/camp-1/items/i2/distribute', { shares: [{ characterId: 'char-1', quantity: 1 }] }));
        expect(await screen.findByText('Potion of Healing is on Ireena’s sheet.')).toBeInTheDocument();
    });

    it("offers a player their fair share of coins, and nothing someone already holds", async () => {
        routeGets({ '/campaigns/camp-1/items': [{ ...coins, dmNotes: undefined }, { ...ring, dmNotes: undefined }] });
        mockApi.post.mockResolvedValue({ given: [{ characterId: 'char-1', name: 'Ireena' }] });
        renderWithToasts(<LootPanel campaignId="camp-1" isDm={false} party={twoPlayers} />);
        expect(await screen.findByText('350 gp, 189 sp')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /Ring of Warmth/ })).not.toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Take a share of Vault Coins' }));
        const dialog = await screen.findByRole('dialog', { name: 'Take Vault Coins' });
        expect(within(dialog).getByLabelText('Ireena: gp')).toHaveValue('175');
        expect(within(dialog).getByLabelText('Ireena: sp')).toHaveValue('94');
        expect(within(dialog).queryByLabelText(/Ismark/)).not.toBeInTheDocument();
        expect(within(dialog).getByText('Left in the pool: 175 gp, 95 sp')).toBeInTheDocument();
        fireEvent.click(within(dialog).getByRole('button', { name: 'Take' }));
        await waitFor(() => expect(mockApi.post).toHaveBeenCalledWith('/campaigns/camp-1/items/i3/distribute', { shares: [{ characterId: 'char-1', coins: { gp: 175, sp: 94 } }] }));
    });

    it('lets the DM split a stack evenly, and stops them giving more than there is', async () => {
        const party2 = twoPlayers.map(({ isMine: _mine, ...c }) => c);
        routeGets({ '/campaigns/camp-1/items': [{ ...potion, quantity: 5 }] });
        mockApi.post.mockResolvedValue({ given: [{ characterId: 'char-1', name: 'Ireena' }, { characterId: 'char-2', name: 'Ismark' }] });
        renderWithToasts(<LootPanel campaignId="camp-1" isDm party={party2} />);
        fireEvent.click(await screen.findByRole('button', { name: 'Give Potion of Healing' }));
        const dialog = await screen.findByRole('dialog', { name: 'Give Potion of Healing' });
        fireEvent.change(within(dialog).getByLabelText('Ireena: how many'), { target: { value: '6' } });
        expect(within(dialog).getByRole('alert')).toHaveTextContent("That's more than there is.");
        fireEvent.click(within(dialog).getByRole('button', { name: 'Split evenly' }));
        expect(within(dialog).getByLabelText('Ismark: how many')).toHaveValue('2');
        expect(within(dialog).getByText('Left in the pool: 1')).toBeInTheDocument();
        fireEvent.click(within(dialog).getByRole('button', { name: 'Give' }));
        await waitFor(() => expect(mockApi.post).toHaveBeenCalledWith('/campaigns/camp-1/items/i2/distribute', {
            shares: [{ characterId: 'char-1', quantity: 2 }, { characterId: 'char-2', quantity: 2 }],
        }));
        expect(await screen.findByText('Gave Potion of Healing to Ireena and Ismark. It’s on their sheets.')).toBeInTheDocument();
    });

    it('adds a pile of coins', async () => {
        routeGets({ '/campaigns/camp-1/items': [] });
        mockApi.post.mockImplementation(async (_url: string, body: any) => ({ ...potion, ...body, id: 'i9' }));
        renderWithToasts(<LootPanel campaignId="camp-1" isDm party={party} />);
        fireEvent.click(await screen.findByRole('button', { name: '+ Add item' }));
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Coin purse' } });
        fireEvent.click(screen.getByLabelText(/It's coins/));
        fireEvent.change(screen.getByLabelText('gp'), { target: { value: '25' } });
        fireEvent.change(screen.getByLabelText('cp'), { target: { value: '7' } });
        fireEvent.click(screen.getByRole('button', { name: 'Save item' }));
        await waitFor(() => expect(mockApi.post).toHaveBeenCalledWith('/campaigns/camp-1/items', expect.objectContaining({ name: 'Coin purse', coins: { gp: 25, cp: 7 }, quantity: 1 })));
    });

    it('adds an item', async () => {
        routeGets({ '/campaigns/camp-1/items': [] });
        mockApi.post.mockImplementation(async (_url: string, body: any) => ({ ...potion, ...body, id: 'i9' }));
        renderWithToasts(<LootPanel campaignId="camp-1" isDm party={party} />);
        fireEvent.click(await screen.findByRole('button', { name: '+ Add item' }));
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Bag of Holding' } });
        fireEvent.change(screen.getByLabelText('Rarity'), { target: { value: 'uncommon' } });
        fireEvent.change(screen.getByLabelText('Held by'), { target: { value: 'char-1' } });
        fireEvent.click(screen.getByRole('button', { name: 'Save item' }));
        await waitFor(() => expect(mockApi.post).toHaveBeenCalledWith('/campaigns/camp-1/items', expect.objectContaining({ name: 'Bag of Holding', rarity: 'uncommon', heldBy: 'char-1', quantity: 1, revealed: false })));
        expect(await screen.findByText('Bag of Holding')).toBeInTheDocument();
    });
});

describe('loot on the sheet', () => {
    it('saves a currency edit as a change, and shows the purse the server sends back', async () => {
        const onUpdate = jest.fn();
        // The sheet loaded with 10 gp; loot since then brought the saved purse to 185
        mockApi.post.mockResolvedValue({ currency: { pp: 0, gp: 180, ep: 0, sp: 0, cp: 0 } });
        renderWithToasts(<CurrencyManager characterId="char-1" initialCurrency={{ gp: 10 }} onUpdate={onUpdate} />);
        fireEvent.click(screen.getByText('10'));
        const input = screen.getByDisplayValue('10');
        fireEvent.change(input, { target: { value: '5' } });
        fireEvent.blur(input);
        await waitFor(() => expect(mockApi.post).toHaveBeenCalledWith('/characters/char-1/currency', { change: { gp: -5 } }));
        expect(await screen.findByText('180')).toBeInTheDocument();
        expect(onUpdate).toHaveBeenCalledWith({ pp: 0, gp: 180, ep: 0, sp: 0, cp: 0 });
    });

    it('picks up loot given to an open sheet', async () => {
        jest.useFakeTimers();
        try {
            const onChange = jest.fn();
            mockApi.get.mockResolvedValue({ data: { equipment: ['Rope', { name: 'Potion of Healing', quantity: 2 }], currency: { gp: 60 } } });
            renderWithToasts(<LootSync characterId="char-1" equipment={['Rope']} currency={{ gp: 10 }} onChange={onChange} />);
            await act(async () => { jest.advanceTimersByTime(30_000); });
            expect(mockApi.get).toHaveBeenCalledWith('/characters/char-1');
            expect(onChange).toHaveBeenCalledWith({ equipment: ['Rope', { name: 'Potion of Healing', quantity: 2 }], currency: { gp: 60 } });
            expect(screen.getByText('New loot is on your sheet.')).toBeInTheDocument();
        } finally {
            jest.useRealTimers();
        }
    });
});

describe('session visibility', () => {
    it('lets the DM hide a session from players', async () => {
        routeGets({ '/campaigns/camp-1/sessions': [{ id: 's1', campaignId: 'camp-1', title: 'Chapter 2', playedOn: null, recap: '', dmNotes: 'Secret', shared: false, createdAt: '', updatedAt: '' }] });
        mockApi.post.mockImplementation(async (_url: string, body: any) => ({ id: 's2', campaignId: 'camp-1', createdAt: '', updatedAt: '', ...body }));
        renderWithToasts(<SessionsPanel campaignId="camp-1" isDm />);
        expect(await screen.findByText('Hidden from players')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: '+ Log a session' }));
        const shared = screen.getByLabelText(/Players can see this session/);
        expect(shared).toBeChecked();
        fireEvent.click(shared);
        fireEvent.click(screen.getByRole('button', { name: 'Save session' }));
        await waitFor(() => expect(mockApi.post).toHaveBeenCalledWith('/campaigns/camp-1/sessions', expect.objectContaining({ shared: false })));
    });
});

describe('campaign prep import', () => {
    const prepFile = (contents: object) => {
        const text = JSON.stringify(contents);
        const file = new File([text], 'obelisk.prep.json', { type: 'application/json' });
        // jsdom's File lacks text()
        Object.defineProperty(file, 'text', { value: () => Promise.resolve(text) });
        return file;
    };
    const prep = { format: 'dnd55e-campaign-prep', version: 1, campaign: { name: 'Obelisk', description: 'A shard falls' }, notes: 'Town', encounters: [{ name: 'Ambush', combatants: [] }], items: [{ name: 'Potion' }] };

    it('previews a file, then creates the campaign from it', async () => {
        mockApi.post.mockResolvedValue({ campaign: { id: 'camp-9', name: 'Obelisk' }, counts: { sessions: 0, encounters: 1, monsters: 0, items: 1 } });
        const onImported = jest.fn();
        renderWithToasts(<ImportPrepDialog onClose={() => {}} onImported={onImported} />);
        fireEvent.change(screen.getByTestId('prep-file-input'), { target: { files: [prepFile(prep)] } });
        expect(await screen.findByText('Obelisk')).toBeInTheDocument();
        expect(screen.getByText(/Includes 1 encounter and 1 item, plus DM notes/)).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Create campaign' }));
        await waitFor(() => expect(mockApi.post).toHaveBeenCalledWith('/campaigns/import', expect.objectContaining({ format: 'dnd55e-campaign-prep' })));
        expect(onImported).toHaveBeenCalledWith(expect.objectContaining({ campaign: { id: 'camp-9', name: 'Obelisk' } }));
    });

    it('imports into an existing campaign', async () => {
        mockApi.post.mockResolvedValue({ counts: { sessions: 0, encounters: 1, monsters: 0, items: 1 } });
        renderWithToasts(<ImportPrepDialog into={{ id: 'camp-1', name: 'Strahd' }} onClose={() => {}} onImported={() => {}} />);
        fireEvent.change(screen.getByTestId('prep-file-input'), { target: { files: [prepFile(prep)] } });
        expect(await screen.findByText(/Adds 1 encounter and 1 item, and adds its notes after yours/)).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Import' }));
        await waitFor(() => expect(mockApi.post).toHaveBeenCalledWith('/campaigns/camp-1/prep', expect.anything()));
    });

    it("explains a file it can't use and doesn't upload it", async () => {
        renderWithToasts(<ImportPrepDialog onClose={() => {}} onImported={() => {}} />);
        fireEvent.change(screen.getByTestId('prep-file-input'), { target: { files: [prepFile({ name: 'Tordek', race: 'dwarf', class: 'fighter' })] } });
        expect(await screen.findByRole('alert')).toHaveTextContent('character file');
        expect(screen.queryByRole('button', { name: 'Create campaign' })).not.toBeInTheDocument();
        expect(mockApi.post).not.toHaveBeenCalled();
    });
});

describe('read-only sheet for the DM', () => {
    it('hides HP controls and disables proficiency toggles', () => {
        render(
            <SheetReadOnlyProvider value>
                <HPManager characterId="c" initialHP={{ current: 5, max: 20, temp: 0 }} onUpdate={() => {}} />
                <SkillsCard skills={[{ name: 'Athletics', stat: 'str', total: 5, isProficient: true, hasExpertise: false }]} onToggleProficiency={() => {}} />
            </SheetReadOnlyProvider>
        );
        expect(screen.queryByRole('button', { name: 'Damage' })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Edit hit points' })).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Athletics proficiency' })).toBeDisabled();
    });
});
