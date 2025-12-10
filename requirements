1. Product Overview

Goal:
Build a web application that allows users to create, manage, and share D&D 5.5e (One D&D) character sheets, from level 1 to level cap, with support for official rules, custom content (homebrew), printing/exporting, and integration with common play workflows (e.g., online sessions, VTTs).

Primary value:

For players: streamline character creation and leveling, reduce rules lookups, keep character state consistent and accessible across devices.

For DMs: review players’ sheets, enforce rules, and manage campaign-specific options.

2. User Roles & Permissions

R1. Roles

Anonymous User

Can browse marketing pages and limited demo content.

Can create a temporary character (stored in local storage) with limited features.

Registered Player

Full character creation, editing, saving, exporting.

Can join campaigns, share characters, use homebrew content allowed by DM.

Dungeon Master (DM)

All Player capabilities.

Can create and manage campaigns.

Can view and comment on players’ characters in their campaigns.

Can manage campaign-level homebrew and house rules.

Admin

Manage users, content flags, abuse reports.

Manage system-wide rules data and configuration.

3. Core User Flows

Onboarding & Account

Sign up, login, password reset.

Profile setup (preferred name, avatar, default settings).

Create Character

Step-by-step guided character creation.

Option for quick “random/prebuilt” characters.

Edit & Level Up Character

Open existing character, adjust stats, add gear/spells, level up with rule validation.

Use Character in Play

“Play mode” UI for sessions: HP tracking, resources, conditions, dice roll links, etc.

Share / Export Character

Share link to read-only or DM view.

Export to PDF, JSON, maybe VTT formats.

Homebrew & Campaign Rules

DM defines campaign options; players build characters within those constraints.

Browse / Manage Library

List of characters, campaigns, and homebrew items with search, filter, tags.

4. Functional Requirements
4.1 Account & Authentication

FR-1.0 User Accounts

FR-1.1: The system SHALL allow sign up via email/password.

FR-1.2: The system SHOULD support OAuth (Google, Microsoft, etc.) as a stretch goal.

FR-1.3: The system SHALL support login and logout.

FR-1.4: The system SHALL provide password reset via email link.

FR-1.5: The system SHALL allow users to set a display name and avatar.

FR-1.6: The system SHOULD allow users to set default game preferences (default ruleset version if multiple, metric/imperial, language).

4.2 Character Data Model

FR-2.0 Core Character Structure
Each character MUST at minimum include:

FR-2.1: Identity: name, player name, class(es), subclass(es), level, background, race/species, alignment, deity (optional).

FR-2.2: Ability Scores: STR, DEX, CON, INT, WIS, CHA, including base scores, modifiers, and any bonuses.

FR-2.3: Proficiency & Bonuses: proficiency bonus, saving throw proficiencies, skill proficiencies, expertise.

FR-2.4: Combat Stats: HP (max/current/temporary), Hit Dice, AC, initiative, speed, death save state.

FR-2.5: Attacks & Spellcasting: list of attacks and spellcasting info (spell slots, known/prepared spells, spell DC, spell attack bonus).

FR-2.6: Equipment & Inventory: carried gear, currency, weight tracking (optional), attuned magic items.

FR-2.7: Features & Traits: class features, racial traits, feats, background features, unique abilities.

FR-2.8: Personality & Story: personality traits, ideals, bonds, flaws, backstory, notes.

FR-2.9: Conditions & States: active conditions (blinded, poisoned), concentration status, ongoing effects.

4.3 Character Creation Wizard

FR-3.0 Step-by-Step Builder

FR-3.1: The system SHALL provide a multi-step wizard:

Choose game version / rule set (if more than one supported).

Choose level.

Choose race/species and lineage options.

Choose class and subclass (when applicable).

Assign ability scores (standard array, point buy, manual).

Choose background and starting proficiencies.

Choose starting equipment OR roll for gold and manual equipment.

Choose spells (for spellcasters).

Review & finalize.

FR-3.2: The wizard SHALL validate choices against rules (e.g., number of skill proficiencies, legal spell lists).

FR-3.3: The wizard SHOULD show contextual help and tooltips (e.g., what a feature does).

FR-3.4: The wizard SHOULD allow going back to previous steps without losing data.

FR-3.5: The wizard SHOULD support “Quick Build” suggestions (e.g., recommended ability layouts and feats).

4.4 Rules Engine & Validation

FR-4.0 Rules Application

FR-4.1: The system SHALL automatically apply rules for:

Ability modifiers.

Proficiency bonus by level.

Saving throws and skill modifiers based on proficiency/expertise.

AC calculations from armor and class features.

Spell slots per class/level.

Known/prepared spells per class/level.

FR-4.2: The system SHALL prevent illegal choices (e.g., exceeding allowed number of feats, skills, spells).

FR-4.3: The system SHOULD allow overrides (DM Mode) where constraints can be bypassed, but changes are flagged as “homebrew/override.”

FR-4.4: The system SHOULD support multiple source toggles (e.g., “core only”, “homebrew on/off”) that control which options are available.

4.5 Character Sheet UI

FR-5.0 Display & Interaction

FR-5.1: The system SHALL provide a “Sheet View” showing:

Overview (identity, HP, AC, initiative, passive perception).

Abilities & skills.

Saving throws.

Attacks & spellcasting.

Features & traits.

Equipment & inventory.

Spell list (by level).

Notes / backstory.

FR-5.2: The system SHALL support editing in-place (click-to-edit fields) where allowed.

FR-5.3: The system SHOULD support a “Play Mode” view optimized for sessions:

Large, easily clickable buttons for tracking HP, temporary HP, resources, spell slots, and class features (e.g., Channel Divinity, Rage uses).

Quick access to common rolls (attack, damage, skill checks, saves).

FR-5.4: The system SHOULD visually indicate which stats are influenced by which features (e.g., hover to show sources of AC modifier).

FR-5.5: The system SHOULD support dark mode and high-contrast mode.

4.6 Leveling & Advancement

FR-6.0 Level Up Process

FR-6.1: The system SHALL track character level and experience or milestones.

FR-6.2: The system SHALL provide a “Level Up” flow:

Increase class level (and multi-class choice if used).

Apply new HP, features, spell slots, etc.

Choose new spells, feats, or ability score improvements (ASIs).

FR-6.3: The system SHALL recalculate derived stats after level up.

FR-6.4: The system SHOULD keep a history/log of level-up changes (e.g., “At level 4: ASI +2 DEX”).

FR-6.5: The system SHOULD allow leveling down or undoing the last level (for mistakes).

4.7 Equipment & Inventory Management

FR-7.0 Items

FR-7.1: The system SHALL provide a searchable item library (weapons, armor, mundane items, magic items).

FR-7.2: The system SHALL allow adding/removing items to/from a character’s inventory.

FR-7.3: The system SHALL update weight carried (if optional encumbrance is enabled).

FR-7.4: The system SHALL allow attuning to items with limited attunement slots.

FR-7.5: The system SHOULD support custom/homebrew items defined by users/DMs.

4.8 Spells & Spellcasting

FR-8.0 Spell Management

FR-8.1: The system SHALL provide a spell library filtered by class, level, and tags (e.g., ritual).

FR-8.2: The system SHALL allow adding known or prepared spells to the character, following rules.

FR-8.3: The system SHALL track spell slots per level and use.

FR-8.4: The system SHOULD support marking favorite/frequently used spells for quick access.

FR-8.5: The system SHOULD support cantrip scaling based on character level automatically.

4.9 Campaigns & DM Tools

FR-9.0 Campaign Management

FR-9.1: The system SHALL allow a DM to create a campaign with:

Name, description, default settings (allowed sources, level range, optional rules).

FR-9.2: The system SHALL allow DMs to invite players via link or username/email.

FR-9.3: The system SHALL allow DMs to view all characters in a campaign in read-only or “DM view” (with hidden notes shown, if shared).

FR-9.4: The system SHOULD allow DMs to leave comments or notes on characters (visible to the player).

FR-9.5: The system SHOULD support campaign-specific homebrew content (e.g., custom items, feats, races).

4.10 Homebrew Content

FR-10.0 Customization

FR-10.1: The system SHALL allow users (at least DMs, optionally players) to define custom:

Races/species.

Classes and subclasses.

Backgrounds.

Feats.

Items and spells.

FR-10.2: The system SHALL allow homebrew content to be attached to:

Only the creator.

A specific campaign.

Shared with specific users (if we support content sharing).

FR-10.3: The system SHOULD provide templates and validation for homebrew definitions (e.g., ability score increases, skill lists, spell lists).

FR-10.4: The system SHOULD clearly mark homebrew content vs. official-like content in the UI.

4.11 Sharing, Exporting & Importing

FR-11.0 Data Portability

FR-11.1: The system SHALL allow exporting a character to:

Printable PDF.

JSON (for backups and potential integrations).

FR-11.2: The system SHOULD allow importing from our own JSON exports to restore characters.

FR-11.3: The system SHOULD support a “share link” for a read-only character view.

FR-11.4: The system SHOULD support permission-controlled sharing:

Public read-only.

Private (only specific users).

DM-only notes hidden from public share.

FR-11.5: As a stretch goal, the system COULD support export formats compatible with popular VTTs.

4.12 Search, Filters & Lists

FR-12.0 Library Views

FR-12.1: The system SHALL allow users to see a list of:

Their characters.

Campaigns they are in.

Homebrew items they own/have access to.

FR-12.2: The system SHALL support search by name and filter by:

Character class, level, campaign, tags.

FR-12.3: The system SHOULD support tagging characters (e.g., “one-shot”, “long campaign”, “NPC”).

4.13 Notifications & Activity

FR-13.0 Optional Notifications

FR-13.1: The system SHOULD notify players when:

A DM comments on their character (if notifications are enabled).

They are added to a campaign.

FR-13.2: The system SHOULD allow users to configure notification preferences (email, in-app).

5. Non-Functional Requirements (NFRs)
5.1 Performance & Scalability

NFR-1.1: Page load time for the core app (after initial load) SHOULD be < 2 seconds on a typical broadband connection.

NFR-1.2: Basic interactions such as updating HP, toggling conditions, or adding items SHOULD respond in < 200 ms.

NFR-1.3: The system SHOULD scale to at least [X] concurrent users (to be defined by business) without significant degradation.

5.2 Security & Privacy

NFR-2.1: All authenticated interactions SHALL use HTTPS.

NFR-2.2: Passwords SHALL be stored securely using industry-standard hashing (e.g., bcrypt/argon2).

NFR-2.3: Access control SHALL ensure users can only view/edit characters and campaigns they own or have been granted access to.

NFR-2.4: Sharing links SHALL use non-guessable tokens for security.

NFR-2.5: The system SHOULD log admin actions for audit purposes.

5.3 Reliability & Availability

NFR-3.1: Target uptime SHOULD be at least 99% monthly.

NFR-3.2: The system SHOULD support frequent backups of user data.

NFR-3.3: The system SHOULD have a recovery plan for data loss events (restore from backup within [X] hours).

5.4 Usability & Accessibility

NFR-4.1: The UI SHOULD follow responsive design for desktop, tablet, and mobile.

NFR-4.2: The UI SHOULD follow WCAG 2.1 AA guidelines as much as reasonably possible.

NFR-4.3: Tooltips, inline help, and “?” info icons SHOULD explain key mechanics and fields.

NFR-4.4: Keyboard navigation SHOULD be supported for primary flows (sheet navigation, creation wizard).

5.5 Internationalization & Localization

NFR-5.1: The system SHOULD be architected to support multiple languages.

NFR-5.2: All hard-coded text SHOULD be externalized into translation files.

NFR-5.3: Date/number formats SHOULD adapt to user locale settings where appropriate.

5.6 Technology & Architecture (High Level)

(PO-level guidelines; dev team to refine.)

NFR-6.1: The frontend SHOULD be a modern SPA framework (React/Vue/Angular) with state management suitable for offline/optimistic updates.

NFR-6.2: The backend SHOULD expose a REST or GraphQL API for core entities (users, characters, campaigns, homebrew).

NFR-6.3: Data MUST be stored in a persistent database (RDBMS or NoSQL) with a clear schema for versioning character data.

NFR-6.4: The system SHOULD support a staging environment for QA before production releases.

6. Prioritization (MoSCoW Example)

You can adjust, but as a starting point:

Must Have (MVP):

Account & auth (basic).

Character data model.

Character creation wizard (core steps).

Rules engine for main classes and races.

Character sheet view & basic edit.

Level up flow.

Equipment/spell libraries (core).

Export to PDF.
