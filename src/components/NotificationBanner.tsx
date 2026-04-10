import { Info, AlertTriangle, AlertCircle, ExternalLink } from 'lucide-react';
import styles from './NotificationBanner.module.css';

export function NotificationBanner() {
    const text = import.meta.env.VITE_ANNOUNCEMENT_TEXT;
    const level = (import.meta.env.VITE_ANNOUNCEMENT_LEVEL || 'info').toLowerCase();
    const linkUrl = import.meta.env.VITE_ANNOUNCEMENT_LINK;
    const linkText = import.meta.env.VITE_ANNOUNCEMENT_LINK_TEXT || 'Learn more';

    if (!text) return null;

    let levelClass = styles.bannerInfo;
    let Icon = Info;

    if (level === 'alert') {
        levelClass = styles.bannerAlert;
        Icon = AlertCircle;
    } else if (level === 'warning') {
        levelClass = styles.bannerWarning;
        Icon = AlertTriangle;
    }

    return (
        <div className={`${styles.banner} ${levelClass}`}>
            <div className={styles.content}>
                <Icon size={16} />
                <span>{text}</span>
            </div>

            {linkUrl && (
                <a
                    href={linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                >
                    {linkText}
                    <ExternalLink size={13} />
                </a>
            )}
        </div>
    );
}
