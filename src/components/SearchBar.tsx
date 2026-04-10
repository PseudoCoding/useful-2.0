import { useState } from 'react';
import { Search, X } from 'lucide-react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    onSearch: (query: string, tags: string[]) => void;
    availableTags: string[];
}

export function SearchBar({ onSearch, availableTags }: SearchBarProps) {
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
        <div className={styles.container}>
            <div className={styles.inputWrapper}>
                <Search size={18} className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Search resources..."
                    value={query}
                    onChange={handleQueryChange}
                    className={styles.input}
                />
                {query && (
                    <button
                        onClick={() => { setQuery(''); onSearch('', selectedTags); }}
                        className={styles.clearButton}
                        aria-label="Clear search"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {availableTags.length > 0 && (
                <div>
                    <p className={styles.tagsLabel}>Filter by tag</p>
                    <div className={styles.tags}>
                        {availableTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`${styles.tag}${selectedTags.includes(tag) ? ` ${styles.tagActive}` : ''}`}
                                aria-pressed={selectedTags.includes(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
