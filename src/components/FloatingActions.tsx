import { ThemeToggle } from './ThemeToggle';
import { RefreshCw } from 'lucide-react';
import styles from './FloatingActions.module.css';

interface FloatingActionsProps {
    onRefresh: () => void;
    isRefreshing: boolean;
}

export function FloatingActions({ onRefresh, isRefreshing }: FloatingActionsProps) {
    return (
        <div className={styles.container}>
            <div className={styles.tooltipWrapper}>
                <button
                    onClick={onRefresh}
                    disabled={isRefreshing}
                    className={styles.button}
                    aria-label="Refresh data"
                >
                    <RefreshCw size={20} className={isRefreshing ? styles.spinning : undefined} />
                </button>
                <span className={styles.tooltip}>Refresh data</span>
            </div>
            <ThemeToggle />
        </div>
    );
}
