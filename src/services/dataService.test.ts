import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchHubConfig } from './dataService';

describe('fetchHubConfig', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn());
        vi.stubEnv('VITE_DATA_MODE', 'api');
        vi.stubEnv('VITE_DATA_MODE', 'api');
        vi.stubEnv('VITE_DATA_URL', 'http://test-url.com/data');
    });

    afterEach(() => {
        vi.unstubAllEnvs();
        vi.restoreAllMocks();
        localStorage.clear();
    });

    const mockJson = JSON.stringify({
        sites: [
            { name: "Test Site", description: "A site", url: "http://example.com" }
        ]
    });

    const mockYaml = `
sites:
  - name: "Yaml Site"
    description: "A site from yaml"
    url: "http://example.com/yaml"
`;

    it('fetches and parses JSON data correctly', async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            text: () => Promise.resolve(mockJson)
        } as unknown as Response);

        const result = await fetchHubConfig();
        expect(result.sites).toHaveLength(1);
        expect(result.sites[0].name).toBe("Test Site");
        expect(fetch).toHaveBeenCalledWith('http://test-url.com/data', expect.any(Object));
    });

    it('fetches and parses YAML data correctly', async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            text: () => Promise.resolve(mockYaml)
        } as unknown as Response);

        const result = await fetchHubConfig();
        expect(result.sites).toHaveLength(1);
        expect(result.sites[0].name).toBe("Yaml Site");
    });

    it('throws an error if response is not ok', async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: false,
            status: 404
        } as unknown as Response);

        await expect(fetchHubConfig()).rejects.toThrow(/HTTP error! status: 404/);
    });

    it('adds git headers when mode is git', async () => {
        vi.stubEnv('VITE_DATA_MODE', 'git');

        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            text: () => Promise.resolve(mockJson)
        } as unknown as Response);

        await fetchHubConfig();

        expect(fetch).toHaveBeenCalledWith('http://test-url.com/data', {
            headers: {
                'Accept': 'application/vnd.github.v3.raw, application/json, application/yaml, text/plain',
            }
        });
    });
});
