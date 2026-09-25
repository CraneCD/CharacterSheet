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
        expect(screen.getAllByRole('tab').map((t) => t.textContent)).toEqual(['Party', 'Sessions', 'Encounters', 'Bestiary', 'Notes']);
    });

    it("shows players the party and the turn order, but not the DM's tools", async () => {
        routeGets({ '/campaigns/camp-1': playerCampaign });
        renderWithToasts(<CampaignPage />);
        expect(await screen.findByRole('heading', { name: 'Curse of Strahd' })).toBeInTheDocument();
        expect(screen.queryByText('ABC-234')).not.toBeInTheDocument();
        expect(screen.getAllByRole('tab').map((t) => t.textContent)).toEqual(['Party', 'Sessions']);
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
