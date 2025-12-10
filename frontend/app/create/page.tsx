'use client';

import WizardContainer from './components/WizardContainer';

export default function CreateCharacterPage() {
    return (
        <div>
            <h1 className="heading" style={{ textAlign: 'center', margin: '2rem 0' }}>Create New Character</h1>
            <WizardContainer />
        </div>
    );
}
