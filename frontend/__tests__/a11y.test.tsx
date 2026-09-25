/**
 * Automated accessibility checks (axe) on the main screens and shared components.
 * jsdom can't compute colors, so contrast is covered separately by the design tokens.
 */
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import LoginPage from '@/app/(auth)/login/page';
import RegisterPage from '@/app/(auth)/register/page';
import Dashboard from '@/app/dashboard/page';
import { ToastProvider } from '@/app/components/ui/Toast';
import ConfirmDialog from '@/app/components/ui/ConfirmDialog';
import Menu from '@/app/components/ui/Menu';
import HPManager from '@/app/character/[id]/components/HPManager';
import AbilityScoresCard from '@/app/character/[id]/components/sections/AbilityScoresCard';
import SkillsCard from '@/app/character/[id]/components/sections/SkillsCard';
import SavingThrowsCard from '@/app/character/[id]/components/sections/SavingThrowsCard';
import LanguagesCard from '@/app/character/[id]/components/sections/LanguagesCard';
import SensesCard from '@/app/character/[id]/components/sections/SensesCard';
import ProficienciesCard from '@/app/character/[id]/components/sections/ProficienciesCard';
import ConditionsCard from '@/app/character/[id]/components/sections/ConditionsCard';
import NotesCard from '@/app/character/[id]/components/sections/NotesCard';
import SpellFilterBar from '@/app/character/[id]/components/SpellFilterBar';
import SlotPips from '@/app/character/[id]/components/SlotPips';
import { ShortRestDialog } from '@/app/character/[id]/components/RestDialogs';
import WizardStepper from '@/app/create/components/WizardStepper';
import StepAbilities from '@/app/create/components/StepAbilities';
import { EMPTY_SPELL_FILTERS } from '@/lib/spellFilters';
import { api } from '@/lib/api';
import CampaignsPage from '@/app/campaigns/page';
import CampaignPage from '@/app/campaigns/[id]/page';
import EncounterPage from '@/app/campaigns/[id]/encounters/[encounterId]/page';
import JoinCampaignDialog from '@/app/campaigns/components/JoinCampaignDialog';
import MonsterForm from '@/app/campaigns/components/MonsterForm';
import BestiaryPanel from '@/app/campaigns/[id]/components/BestiaryPanel';
import SessionsPanel from '@/app/campaigns/[id]/components/SessionsPanel';

expect.extend(toHaveNoViolations);

jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
    usePathname: () => '/dashboard',
    useParams: () => ({ id: 'camp-1', encounterId: 'enc-1' }),
}));
jest.mock('@/lib/api', () => ({
    api: { get: jest.fn(), post: jest.fn(), put: jest.fn(), patch: jest.fn(), delete: jest.fn() },
    ApiError: class ApiError extends Error {},
}));

async function expectNoViolations(container: Element = document.body) {
    expect(await axe(container)).toHaveNoViolations();
}

describe('accessibility (axe)', () => {
    it('login and register forms', async () => {
        const { container, unmount } = render(<ToastProvider><LoginPage /></ToastProvider>);
        await expectNoViolations(container);
        unmount();
        const register = render(<ToastProvider><RegisterPage /></ToastProvider>);
        await expectNoViolations(register.container);
    });

    it('dashboard with a character', async () => {
        (api.get as jest.Mock).mockResolvedValue([
            { id: '1', name: 'Tordek', race: 'dwarf', class: 'fighter', level: 3, updatedAt: new Date().toISOString(), data: { hp: { current: 5, max: 10, temp: 0 } } },
        ]);
        const { container } = render(<ToastProvider><Dashboard /></ToastProvider>);
        await screen.findByText('Tordek');
        await expectNoViolations(container);
    });

    it('sheet cards', async () => {
        const scores = { str: 16, dex: 12, con: 14, int: 10, wis: 13, cha: 8 };
        const { container } = render(
            <main>
                <HPManager characterId="c" initialHP={{ current: 0, max: 20, temp: 3 }} onUpdate={() => {}} />
                <AbilityScoresCard scores={scores} modifiers={{ str: 3, dex: 1, con: 2, int: 0, wis: 1, cha: -1 }} onChange={() => {}} />
                <SavingThrowsCard saves={[{ stat: 'str', total: 5, isProficient: true }]} />
                <SkillsCard skills={[{ name: 'Athletics', stat: 'str', total: 5, isProficient: true, hasExpertise: true }]} onToggleProficiency={() => {}} />
                <LanguagesCard languages={['Common']} onAdd={() => {}} onRemove={() => {}} />
                <SpellFilterBar filters={EMPTY_SPELL_FILTERS} onChange={() => {}} levels={[0, 1]} schools={['Evocation']} shown={2} total={2} />
                <SlotPips label="Level 1 spell slots" total={3} used={1} onChange={() => {}} />
            </main>
        );
        await expectNoViolations(container);
    });

    it('left-column cards, open and collapsed', async () => {
        const toggle = { onToggle: () => {} };
        const { container } = render(
            <main>
                <HPManager characterId="c" initialHP={{ current: 8, max: 20, temp: 0 }} onUpdate={() => {}} conditions={{ conditions: ['Prone'], exhaustion: 1 }} />
                <SensesCard passives={{ perception: 13, investigation: 10, insight: 13 }} darkvision={60} resistances={[{ type: 'Fire', source: 'Hellish Resistance' }]} collapsed={false} {...toggle} />
                <ProficienciesCard armor={['Light armor']} weapons={['Simple weapons']} tools={[]} languages={['Common']} onAddLanguage={() => {}} onRemoveLanguage={() => {}} collapsed autoCollapsed {...toggle} />
                <ConditionsCard active={{ conditions: ['Poisoned'], exhaustion: 2 }} onChange={() => {}} collapsed={false} {...toggle} />
                <NotesCard pages={['Session one']} onSave={async () => true} collapsed={false} {...toggle} />
            </main>
        );
        await expectNoViolations(container);
    });

    it('dialogs and menus', async () => {
        render(
            <>
                <Menu label="⋯" ariaLabel="More actions" items={[{ label: 'Export', onSelect: () => {} }]} />
                <ConfirmDialog title="Delete character?" confirmLabel="Delete" danger onConfirm={() => {}} onCancel={() => {}}>
                    Gone for good.
                </ConfirmDialog>
            </>
        );
        await expectNoViolations();
    });

    it('short rest dialog', async () => {
        render(
            <ShortRestDialog
                data={{ hp: { current: 5, max: 20, temp: 0 }, hitDice: { total: 3, spent: 0, dieType: 10 } }}
                context={{ warlockLevel: 0, multiclass: false, hasMagicInitiateSpell: false }}
                conModifier={2}
                busy={false}
                onConfirm={() => {}}
                onCancel={() => {}}
            />
        );
        await expectNoViolations();
    });

    it('character creation stepper and ability step', async () => {
        const { container } = render(
            <main>
                <WizardStepper steps={[{ label: 'Species' }, { label: 'Class' }]} current={2} isComplete={() => true} canVisit={() => true} onSelect={() => {}} />
                <StepAbilities initialScores={{ str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }} method="pointBuy" onUpdate={() => {}} />
            </main>
        );
        await expectNoViolations(container);
    });

    describe('campaigns', () => {
        const party = [{
            id: 'char-1', userId: 'p1', name: 'Ireena', race: 'human', class: 'fighter', level: 3,
            hp: { current: 0, max: 28, temp: 0, deathSaves: { successes: 1, failures: 0 } }, conditions: ['Prone'], exhaustion: 1, languages: [],
        }];
        const campaign = {
            id: 'camp-1', name: 'Curse of Strahd', description: 'Gothic horror', role: 'dm', dm: { id: 'dm', name: 'Dana' }, joinCode: 'ABC234',
            notes: '', members: [{ userId: 'p1', name: 'Pat', joinedAt: '2026-09-01T00:00:00Z' }], party, activeEncounter: null,
            createdAt: '2026-09-01T00:00:00Z', updatedAt: '2026-09-01T00:00:00Z',
        };
        const zombie = {
            id: 'zombie', name: 'Zombie', size: 'Medium', type: 'Undead', ac: 8, hp: 15, hitDice: '2d8+6', speed: '20 ft.',
            abilities: { str: 13, dex: 6, con: 16, int: 3, wis: 6, cha: 5 }, saves: { wis: 0 }, skills: { Perception: 0 }, cr: '1/4',
            traits: [{ name: 'Undead Fortitude', description: 'It might get back up.' }],
            actions: [{ name: 'Slam', description: 'Hit: 5 (1d8 + 1) Bludgeoning damage.', attackBonus: 3, damage: '1d8+1' }],
        };
        const routes: Record<string, unknown> = {
            '/campaigns': [
                { id: 'camp-1', name: 'Curse of Strahd', description: null, role: 'dm', dmName: 'Dana', memberCount: 1, characterCount: 1, myCharacters: [], activeEncounter: null, updatedAt: '' },
                { id: 'camp-2', name: 'Phandelver', description: 'Mines', role: 'player', dmName: 'Sam', memberCount: 4, characterCount: 4, myCharacters: [], activeEncounter: null, updatedAt: '' },
            ],
            '/campaigns/camp-1': campaign,
            '/campaigns/camp-1/encounters/enc-1': {
                id: 'enc-1', name: 'Ambush', status: 'active', data: {
                    round: 1, turn: 1, combatants: [
                        { id: 'pc1', kind: 'pc', name: 'Ireena', characterId: 'char-1', initiative: 12, initiativeBonus: 1 },
                        { id: 'z1', kind: 'monster', name: 'Zombie', monsterId: 'zombie', monsterSource: 'srd', initiative: 9, initiativeBonus: -2, ac: 8, hp: { current: 4, max: 15, temp: 0 }, conditions: ['Grappled'], xp: 50 },
                    ],
                },
            },
            '/campaigns/camp-1/sessions': [{ id: 's1', campaignId: 'camp-1', title: 'Into the mists', playedOn: '2026-09-20T00:00:00.000Z', recap: 'We met Ireena.', dmNotes: 'Strahd watches', createdAt: '', updatedAt: '' }],
            '/reference/monsters': [zombie],
            '/monsters': [],
            '/characters': [],
        };
        beforeEach(() => {
            (api.get as jest.Mock).mockImplementation(async (url: string) => routes[url]);
        });

        it('campaign list and join dialog', async () => {
            const { container } = render(<ToastProvider><main><CampaignsPage /></main></ToastProvider>);
            await screen.findByText('Phandelver');
            await expectNoViolations(container);
            render(<JoinCampaignDialog onClose={() => {}} onJoined={() => {}} />);
            await expectNoViolations();
        });

        it('campaign hub (DM view)', async () => {
            const { container } = render(<ToastProvider><main><CampaignPage /></main></ToastProvider>);
            await screen.findByText('ABC-234');
            await expectNoViolations(container);
        });

        it('session log and bestiary', async () => {
            const { container } = render(
                <ToastProvider>
                    <main>
                        <SessionsPanel campaignId="camp-1" isDm />
                        <BestiaryPanel />
                    </main>
                </ToastProvider>
            );
            await screen.findByText('Into the mists');
            await screen.findByText('Zombie');
            await expectNoViolations(container);
        });

        it('combat tracker with a stat block', async () => {
            const { container } = render(<ToastProvider><main><EncounterPage /></main></ToastProvider>);
            await screen.findByRole('button', { name: /Roll Zombie: Slam/ });
            await expectNoViolations(container);
        });

        it('custom monster form', async () => {
            render(<MonsterForm initial={zombie} onClose={() => {}} onSaved={() => {}} />);
            await expectNoViolations();
        });
    });
});
