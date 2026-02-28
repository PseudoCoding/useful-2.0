import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
    onSearch: (query: string, tags: string[]) => void;
    availableTags: string[];
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, availableTags }) => {
    const [query, setQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        onSearch(newQuery, selectedTags);
    };

    const toggleTag = (tag: string) => {
        const newTags = selectedTags.includes(tag)
            ? selectedTags.filter(t => t !== tag)
            : [...selectedTags, tag];

        setSelectedTags(newTags);
        onSearch(query, newTags);
    };

    return (
        <div className="glass-panel animate-fade-in animate-delay-1" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                <Search
                    size={20}
                    color="var(--text-secondary)"
                    style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
                />
                <input
                    type="text"
                    placeholder="Search resources..."
                    value={query}
                    onChange={handleQueryChange}
                    style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3rem',
                        background: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        color: 'var(--text-primary)',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color var(--transition-fast)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
                {query && (
                    <button
                        onClick={() => { setQuery(''); onSearch('', selectedTags); }}
                        style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex' }}
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {availableTags.length > 0 && (
                <div>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Filter by Tags
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {availableTags.map(tag => {
                            const isActive = selectedTags.includes(tag);
                            return (
                                <button
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    style={{
                                        background: isActive ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.05)',
                                        border: `1px solid ${isActive ? 'var(--accent-hover)' : 'var(--border-color)'}`,
                                        color: isActive ? '#fff' : 'var(--text-secondary)',
                                        padding: '0.4rem 1rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        transition: 'all var(--transition-fast)',
                                        fontWeight: isActive ? 500 : 400
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                            e.currentTarget.style.color = 'var(--text-primary)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                            e.currentTarget.style.color = 'var(--text-secondary)';
                                        }
                                    }}
                                >
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
