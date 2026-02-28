import { useEffect, useState, useMemo } from 'react';
import { fetchHubConfig } from './services/dataService';
import type { HubConfig } from './types';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { ResourceCard } from './components/ResourceCard';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import { NotificationBanner } from './components/NotificationBanner';
import { AlertCircle, Loader2 } from 'lucide-react';

function App() {
  const [config, setConfig] = useState<HubConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const loadData = async (forceRefresh = false) => {
    try {
      setLoading(true);
      const data = await fetchHubConfig(forceRefresh);
      setConfig(data);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load configuration');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = import.meta.env.VITE_SITE_NAME || 'Company Resource Hub';

    // Apply custom accent colors if defined
    const root = document.documentElement;
    if (import.meta.env.VITE_COLOR_PRIMARY) root.style.setProperty('--accent-primary', import.meta.env.VITE_COLOR_PRIMARY);
    if (import.meta.env.VITE_COLOR_SECONDARY) root.style.setProperty('--accent-secondary', import.meta.env.VITE_COLOR_SECONDARY);
    if (import.meta.env.VITE_COLOR_HOVER) root.style.setProperty('--accent-hover', import.meta.env.VITE_COLOR_HOVER);

    // Dynamic Favicon to match the Logo or Color
    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    if (favicon) {
      if (import.meta.env.VITE_SITE_LOGO) {
        favicon.href = import.meta.env.VITE_SITE_LOGO;
      } else if (import.meta.env.VITE_COLOR_PRIMARY) {
        const primaryColor = import.meta.env.VITE_COLOR_PRIMARY;
        const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 24 24" fill="none" stroke="${primaryColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`;
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
        favicon.href = URL.createObjectURL(svgBlob);
      }
    }

    loadData();
  }, []);

  const handleForceRefresh = () => {
    loadData(true);
  };

  const handleSearch = (query: string, tags: string[]) => {
    setSearchQuery(query.toLowerCase());
    setSelectedTags(tags);
  };

  const availableTags = useMemo(() => {
    if (!config) return [];
    const tags = new Set<string>();
    config.sites.forEach(site => {
      if (site.tags) {
        site.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [config]);

  const filteredSites = useMemo(() => {
    if (!config) return [];
    return config.sites.filter(site => {
      // Filter by query
      const matchesQuery =
        (site.name || '').toLowerCase().includes(searchQuery) ||
        (site.description || '').toLowerCase().includes(searchQuery);

      if (!matchesQuery) return false;

      // Filter by tags (must have all selected tags)
      if (selectedTags.length > 0) {
        if (!site.tags) return false;
        const siteTags = new Set(site.tags);
        const hasAllTags = selectedTags.every(tag => siteTags.has(tag));
        if (!hasAllTags) return false;
      }

      return true;
    });
  }, [config, searchQuery, selectedTags]);

  return (
    <>
      <NotificationBanner />
      <div className="container">
        <Header />

        <main>
          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
              <Loader2 size={48} className="animate-spin" style={{ animation: 'spin 1.5s linear infinite', marginBottom: '1rem', color: 'var(--accent-primary)' }} />
              <p style={{ fontSize: '1.25rem' }}>Loading resources...</p>
              <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {error && (
            <div className="glass-panel animate-fade-in" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid #ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
              <AlertCircle color="#ef4444" size={32} />
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#fca5a5' }}>Error Loading Configuration</h3>
                <p style={{ margin: 0, color: '#fecaca' }}>{error}</p>
              </div>
            </div>
          )}

          {config && !loading && !error && (
            <div className="animate-fade-in animate-delay-2">
              <SearchBar onSearch={handleSearch} availableTags={availableTags} />

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1.5rem',
                marginTop: '2rem'
              }}>
                {filteredSites.map((site, index) => (
                  <ResourceCard key={site.url + site.name} site={site} index={index} />
                ))}
              </div>

              {filteredSites.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
                  <p style={{ fontSize: '1.25rem' }}>No resources found matching your criteria.</p>
                  <button
                    onClick={() => handleSearch('', [])}
                    style={{
                      marginTop: '1rem',
                      background: 'transparent',
                      border: '1px solid var(--accent-primary)',
                      color: 'var(--accent-primary)',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-primary)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
        <Footer />
        <FloatingActions onRefresh={handleForceRefresh} isRefreshing={loading} />
      </div>
    </>
  );
}

export default App;
