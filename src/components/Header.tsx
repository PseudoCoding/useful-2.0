import React from 'react';
import { Compass } from 'lucide-react';

export const Header: React.FC = () => {
    const siteName = import.meta.env.VITE_SITE_NAME || 'Resource Hub';
    const siteLogo = import.meta.env.VITE_SITE_LOGO;

    return (
        <header className="animate-fade-in" style={{ marginBottom: '3rem', marginTop: '1rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'color-mix(in srgb, var(--accent-primary) 10%, transparent)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', boxShadow: 'var(--shadow-glow)' }}>
                {siteLogo ? (
                    <img src={siteLogo} alt={`${siteName} Logo`} style={{ width: 48, height: 48, objectFit: 'contain' }} />
                ) : (
                    <Compass size={48} color="var(--accent-hover)" />
                )}
            </div>
            <h1 style={{ fontSize: '3rem', fontWeight: 700, margin: '0 0 1rem 0', background: 'linear-gradient(to right, var(--accent-hover), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {siteName}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                Discover and access the internal tools, documentation, and services you need.
            </p>
        </header>
    );
};
