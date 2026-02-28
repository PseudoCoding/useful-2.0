# Company Resource Hub

A modern, fast, and secure Single Page Application (SPA) designed to act as an internal directory for your company's URLs, tools, and documentation.

Built with **React, TypeScript, and Vite**, this application supports rich, beautiful aesthetics and instant text/tag filtering. 

It is designed with flexibility in mind—it can fetch the directory configuration via a standard REST API, or securely pull it directly from a private Git repository (e.g., GitHub) using authentication tokens.

## Getting Started (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory.

#### Basic Configuration (Optional branding)
```env
VITE_SITE_NAME="My Resource Hub"
VITE_SITE_LOGO="https://example.com/logo.png"

# Custom Theme Colors (Supports HEX, RGB, HSL, or named colors)
VITE_COLOR_PRIMARY="#10b981"   # Emerald Green
VITE_COLOR_SECONDARY="#059669" 
VITE_COLOR_HOVER="#34d399"
```
*Note: The application browser Favicon will automatically mirror the image specified in `VITE_SITE_LOGO`. If no logo is provided, but a `VITE_COLOR_PRIMARY` is configured, the application will dynamically redraw the default Compass SVG favicon to match your primary brand color.*

#### Global Announcement Banner
You can display a temporary announcement banner at the very top of the application. It supports three distinct visual levels. If `VITE_ANNOUNCEMENT_TEXT` is omitted or empty, the banner disappears. You can also append an optional hyperlink to the banner.
```env
VITE_ANNOUNCEMENT_TEXT="Maintenance scheduled for Saturday 2PM EST"
VITE_ANNOUNCEMENT_LEVEL="warning" # Supports: 'info' (default), 'warning', 'alert'
VITE_ANNOUNCEMENT_LINK="https://status.company.internal" # Optional link added to the banner
VITE_ANNOUNCEMENT_LINK_TEXT="View Status Page" # Optional display text for the link (Defaults to 'Learn more')
```

#### Data Source Configuration
To use dummy data for local development:
```env
# It will automatically generate dummy data if VITE_DATA_URL is missing
```

To fetch data from a public URL:
```env
VITE_DATA_MODE=api
VITE_DATA_URL=https://raw.githubusercontent.com/your-org/repo/main/data.yaml
```

To fetch data from a private GitHub repository:
```env
VITE_DATA_MODE=git
VITE_DATA_URL=https://api.github.com/repos/your-org/repo/contents/data.yaml
VITE_GIT_TOKEN=github_pat_xxxxxx
```

### 3. Start the Development Server
```bash
npm run dev
```

## Features

- **Search & Filter:** Instantly filter resources by free text or by clicking tag pills.
- **Smart Caching:** Data configurations fetched from external URLs are automatically cached in the browser `localStorage` for 1 hour to increase loading speeds and reduce rate limiting. You can bypass this cache anytime by clicking the Refresh button in the bottom right corner of the application.
- **Global Announcements:** Pin temporary alerts (info, warning, or critical) to the top of the hub via environment variables.
- **Dark & Light Mode:** The application features a clean glassmorphism aesthetic that responds to your system's `prefers-color-scheme` preferences. You can override it via the Theme Toggle button in the bottom right corner.
- **Open Source Attribution:** Includes a non-intrusive, customizable sticky footer that credits the open source community by linking to the PseudoCoding domain and the main GitHub repository.

## Data Format (JSON or YAML)
The application expects an object with a `sites` array. Each site requires a `name`, `description`, and `url`. `tags` are optional.

**YAML Example (`data.yaml`):**
```yaml
sites:
  - name: "Employee Portal"
    description: "Submit PTO, view paystubs, and manage benefits."
    url: "https://hr.company.internal"
    tags: ["HR", "Benefits"]
  - name: "Grafana Dashboards"
    description: "Production system monitoring and alerts."
    url: "https://grafana.company.internal"
    tags: ["Engineering", "Monitoring"]
```

## Deployment (Docker)

To securely support fetching from private Git repositories without exposing the Git token to the client browser, this repository includes a multi-stage `Dockerfile`.

It builds the static React SPA, and then serves it via a lightweight Express.js Node proxy. The proxy holds the `VITE_GIT_TOKEN` and securely makes the request on behalf of the client.

### Building the Image
```bash
docker build -t company-resource-hub .
```

### Running the Image
When running the image, you pass the environment variables securely to the Node server:

```bash
docker run -p 8080:8080 \
  -e VITE_DATA_MODE=git \
  -e VITE_DATA_URL=https://api.github.com/repos/your-org/repo/contents/data.yaml \
  -e VITE_GIT_TOKEN=github_pat_xxxxxx \
  company-resource-hub
```

Access the hub at `http://localhost:8080`.

## Testing
Unit tests are written using Vitest to verify data parsing and component rendering logic.

```bash
npm run test
```
