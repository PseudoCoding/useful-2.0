import { Compass } from 'lucide-react';
import styles from './Header.module.css';

export function Header() {
    const siteName = import.meta.env.VITE_SITE_NAME || 'Resource Hub';
    const siteSubtitle = import.meta.env.VITE_SITE_SUBTITLE;
    const siteLogo = import.meta.env.VITE_SITE_LOGO;

    return (
        <header className={styles.header}>
            <div className={styles.icon}>
                {siteLogo ? (
                    <img src={siteLogo} alt={`${siteName} logo`} className={styles.logo} />
                ) : (
                    <Compass size={36} />
                )}
            </div>
            <h1 className={styles.title}>{siteName}</h1>
            {siteSubtitle && (
                <p className={styles.subtitle}>{siteSubtitle}</p>
            )}
        </header>
    );
}
