import type { CSSProperties } from 'react';
import type { Site } from '../types';
import { ExternalLink } from 'lucide-react';
import styles from './ResourceCard.module.css';

interface ResourceCardProps {
    site: Site;
    index: number;
}

function isSafeUrl(url: string): boolean {
    try {
        const parsed = new URL(url, window.location.origin);
        return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
    } catch {
        return false;
    }
}

export function ResourceCard({ site, index }: ResourceCardProps) {
    const safeHref = isSafeUrl(site.url) ? site.url : '#';

    return (
        <a
            href={safeHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
            style={{ '--animation-delay': `${index * 0.04}s` } as CSSProperties}
        >
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{site.name}</h3>
                <ExternalLink size={16} className={styles.cardIcon} />
            </div>

            <p className={styles.cardDescription}>{site.description}</p>

            {site.tags && site.tags.length > 0 && (
                <div className={styles.tags}>
                    {site.tags.map(tag => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                </div>
            )}
        </a>
    );
}
