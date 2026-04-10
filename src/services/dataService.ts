import yaml from 'js-yaml';
import type { HubConfig } from '../types';

const CACHE_KEY = 'hub_config_cache';
const CACHE_EXPIRY_KEY = 'hub_config_cache_expiry';
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

export async function fetchHubConfig(forceRefresh = false): Promise<HubConfig> {
    // Check cache first
    if (!forceRefresh && typeof window !== 'undefined') {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);

        if (cachedData && cacheExpiry) {
            const now = new Date().getTime();
            if (now < parseInt(cacheExpiry, 10)) {
                try {
                    return JSON.parse(cachedData) as HubConfig;
                } catch {
                    console.warn("Found invalid cache data, fetching fresh.");
                }
            }
        }
    }

    const mode = import.meta.env.VITE_DATA_MODE || 'api'; // 'api' or 'git'
    const url = import.meta.env.VITE_DATA_URL;

    if (!url) {
        if (import.meta.env.DEV) {
            // Return dummy data in development mode if no URL is provided
            return {
                sites: [
                    { name: 'Missing VITE_DATA_URL', description: 'Configure VITE_DATA_URL in your .env file', url: '#' }
                ]
            };
        }
        throw new Error('VITE_DATA_URL environment variable is not defined.');
    }

    const headers: Record<string, string> = {
        'Accept': 'application/json, application/yaml, text/yaml, text/plain',
    };

    if (mode === 'git') {
        headers['Accept'] = 'application/vnd.github.v3.raw, application/json, application/yaml, text/plain';
    }

    try {
        const response = await fetch(url, { headers });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();

        const saveToCache = (data: HubConfig) => {
            if (typeof window !== 'undefined') {
                localStorage.setItem(CACHE_KEY, JSON.stringify(data));
                localStorage.setItem(CACHE_EXPIRY_KEY, (new Date().getTime() + CACHE_DURATION_MS).toString());
            }
            return data;
        };

        // Try parsing as JSON first
        try {
            const jsonData = JSON.parse(text);
            if (jsonData && Array.isArray(jsonData.sites)) {
                return saveToCache(jsonData as HubConfig);
            }
        } catch {
            // Ignore JSON parse error and fallback to YAML
        }

        // Try parsing as YAML
        try {
            const yamlData = yaml.load(text) as HubConfig;
            if (yamlData && Array.isArray(yamlData.sites)) {
                return saveToCache(yamlData);
            }
        } catch {
            throw new Error("Data retrieved was not valid JSON or YAML format matching the expected schema.");
        }

        throw new Error("Unable to parse config, structure may be incorrect.");

    } catch (error) {
        console.error("Error fetching config:", error);
        throw error;
    }
}
