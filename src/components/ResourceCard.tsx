import React from 'react';
import type { Site } from '../types';
import { ExternalLink } from 'lucide-react';

interface ResourceCardProps {
    site: Site;
    index: number;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ site, index }) => {
    // Sanitize URL to prevent javascript: URI XSS
    const isSafeUrl = (url: string) => {
        try {
            const parsedUrl = new URL(url, window.location.origin);
            return ['http:', 'https:', 'mailto:'].includes(parsedUrl.protocol);
        } catch {
            return false;
        }
    };
    const safeHref = isSafeUrl(site.url) ? site.url : '#';

    return (
        <a
            href={safeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel glass-panel-hover animate-fade-in"
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem',
                textDecoration: 'none',
                color: 'inherit',
                animationDelay: `${index * 0.05}s`
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
                    {site.name}
                </h3>
                <ExternalLink size={20} color="var(--text-secondary)" style={{ opacity: 0.7 }} />
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', flexGrow: 1, marginBottom: '1.5rem', lineHeight: 1.6 }}>
                {site.description}
            </p>

            {site.tags && site.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
                    {site.tags.map(tag => (
                        <span key={tag} style={{
                            background: 'rgba(99, 102, 241, 0.1)',
                            border: '1px solid rgba(99, 102, 241, 0.2)',
                            color: 'var(--accent-hover)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </a>
    );
};
