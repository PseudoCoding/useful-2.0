import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ResourceCard } from './ResourceCard';

describe('ResourceCard', () => {
    it('renders site details correctly', () => {
        const site = {
            name: 'Google',
            description: 'Search engine',
            url: 'https://google.com',
            tags: ['search', 'tool']
        };

        render(<ResourceCard site={site} index={0} />);

        expect(screen.getByText('Google')).toBeInTheDocument();
        expect(screen.getByText('Search engine')).toBeInTheDocument();
        expect(screen.getByText('search')).toBeInTheDocument();
        expect(screen.getByText('tool')).toBeInTheDocument();

        // Check if the <a> tag has the right href
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', 'https://google.com');
    });
});
