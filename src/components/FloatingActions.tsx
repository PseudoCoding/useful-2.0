import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { RefreshCw } from 'lucide-react';

interface FloatingActionsProps {
    onRefresh: () => void;
    isRefreshing: boolean;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onRefresh, isRefreshing }) => {
    return (
        <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            zIndex: 1000,
        }}>
            <div className="tooltip-container">
                <button
                    onClick={onRefresh}
                    disabled={isRefreshing}
                    className="glass-panel glass-panel-hover"
                    style={{
                        width: '3.5rem',
                        height: '3.5rem',
                        borderRadius: '50%',
                        cursor: isRefreshing ? 'wait' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isRefreshing ? 'var(--bg-glass-hover)' : 'var(--bg-glass)',
                        opacity: isRefreshing ? 0.7 : 1,
                        padding: 0
                    }}
                    aria-label="Refresh Data"
                >
                    <RefreshCw size={24} color="var(--accent-hover)" className={isRefreshing ? "animate-spin" : ""} style={isRefreshing ? { animation: "spin 1s linear infinite" } : {}} />
                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                </button>
                <span className="tooltip-text">Force Refresh Cache</span>
            </div>
            <ThemeToggle />
        </div>
    );
};
