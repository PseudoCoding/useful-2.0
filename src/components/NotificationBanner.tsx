import React from 'react';
import { Info, AlertTriangle, AlertCircle, ExternalLink } from 'lucide-react';

export const NotificationBanner: React.FC = () => {
    const text = import.meta.env.VITE_ANNOUNCEMENT_TEXT;
    const level = (import.meta.env.VITE_ANNOUNCEMENT_LEVEL || 'info').toLowerCase();
    const linkUrl = import.meta.env.VITE_ANNOUNCEMENT_LINK;
    const linkText = import.meta.env.VITE_ANNOUNCEMENT_LINK_TEXT || 'Learn more';

    if (!text) return null;

    let bgStyle = '';
    let borderStyle = '';
    let textColor = '';
    let Icon = Info;

    switch (level) {
        case 'alert':
            bgStyle = 'rgba(239, 68, 68, 0.1)'; // Red 500
            borderStyle = '1px solid rgba(239, 68, 68, 0.4)';
            textColor = '#ef4444';
            Icon = AlertCircle;
            break;
        case 'warning':
            bgStyle = 'rgba(245, 158, 11, 0.1)'; // Amber 500
            borderStyle = '1px solid rgba(245, 158, 11, 0.4)';
            textColor = '#f59e0b';
            Icon = AlertTriangle;
            break;
        case 'info':
        default:
            bgStyle = 'color-mix(in srgb, var(--accent-primary) 10%, transparent)';
            borderStyle = '1px solid var(--border-hover)';
            textColor = 'var(--text-primary)';
            Icon = Info;
            break;
    }

    return (
        <div style={{
            background: bgStyle,
            borderBottom: borderStyle,
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            color: textColor,
            fontSize: '0.875rem',
            textAlign: 'center',
            fontWeight: 500,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 100,
            position: 'relative',
            flexWrap: 'wrap'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Icon size={18} style={{ flexShrink: 0 }} />
                <span>{text}</span>
            </div>

            {linkUrl && (
                <a
                    href={linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: 'inherit',
                        textDecoration: 'none',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        borderBottom: `1px solid ${textColor}`,
                        paddingBottom: '1px',
                        transition: 'opacity var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                    {linkText}
                    <ExternalLink size={14} />
                </a>
            )}
        </div>
    );
};
