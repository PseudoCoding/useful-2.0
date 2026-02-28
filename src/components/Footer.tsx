import React from 'react';
import { Github } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer style={{
            marginTop: 'auto',
            padding: '4rem 0 2rem 0',
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            borderTop: '1px solid transparent', // Kept for structural consistency if needed
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Built with passion by</span>
                <a
                    href="https://pseudocoding.xyz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: 'var(--accent-hover)',
                        textDecoration: 'none',
                        fontWeight: 500,
                        transition: 'color var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--accent-hover)'}
                >
                    PseudoCoding
                </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.8, fontSize: '0.75rem' }}>
                <span>Open source and free to use</span>
                <span>&bull;</span>
                <a
                    href="https://github.com/PseudoCoding/useful-2.0"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: 'inherit',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        textDecoration: 'none',
                        transition: 'color var(--transition-fast)',
                        position: 'relative',
                        zIndex: 10
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                    className="tooltip-container"
                >
                    <Github size={14} />
                    <span style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>View Source</span>
                    <span className="tooltip-text" style={{ bottom: '100%', top: 'auto', right: '50%', transform: 'translate(50%, -8px)' }}>github.com/PseudoCoding</span>
                </a>
            </div>
        </footer>
    );
};
