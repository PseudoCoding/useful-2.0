import { Github } from 'lucide-react';
import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.row}>
                <span>Made by</span>
                <a
                    href="https://pseudocoding.xyz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                >
                    PseudoCoding
                </a>
            </div>

            <div className={styles.row}>
                <span>Open source</span>
                <span className={styles.divider}>&bull;</span>
                <a
                    href="https://github.com/PseudoCoding/useful-2.0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubLink}
                >
                    <Github size={13} />
                    <span>View on GitHub</span>
                </a>
            </div>
        </footer>
    );
}
