export interface Site {
  name: string;
  description: string;
  url: string;
  tags?: string[];
}

export interface HubConfig {
  sites: Site[];
}
