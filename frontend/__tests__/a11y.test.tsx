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
import SpellFilterBar from '@/app/character/[id]/components/SpellFilterBar';
import SlotPips from '@/app/character/[id]/components/SlotPips';
import { ShortRestDialog } from '@/app/character/[id]/components/RestDialogs';
import WizardStepper from '@/app/create/components/WizardStepper';
import StepAbilities from '@/app/create/components/StepAbilities';
import { EMPTY_SPELL_FILTERS } from '@/lib/spellFilters';
import { api } from '@/lib/api';

expect.extend(toHaveNoViolations);

jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
    usePathname: () => '/dashboard',
}));
jest.mock('@/lib/api', () => ({
    api: { get: jest.fn(), post: jest.fn(), patch: jest.fn(), delete: jest.fn() },
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
});
