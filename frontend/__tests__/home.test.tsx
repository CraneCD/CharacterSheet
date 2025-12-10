import { render, screen } from '@testing-library/react';
import Home from '../app/page';
import '@testing-library/jest-dom';

describe('Home Page', () => {
    it('renders the main heading', () => {
        render(<Home />);
        const heading = screen.getByText(/D&D 5.5e Character Sheet/i);
        expect(heading).toBeInTheDocument();
    });
});
