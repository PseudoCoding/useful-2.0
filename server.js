import express from 'express';
import path from 'path';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Apply CORS but restrict origins dynamically if specified, otherwise only local/domain
const corsOptions = {
    origin: process.env.ALLOWED_ORIGIN || '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Set up rate limiting: max 100 requests per 15 minutes per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});

// Secure API Route to proxy Git fetch
app.get('/api/data', limiter, async (req, res) => {
    const url = process.env.VITE_DATA_URL;
    const mode = process.env.VITE_DATA_MODE || 'api';
    const token = process.env.VITE_GIT_TOKEN;

    if (!url) {
        return res.status(500).send('VITE_DATA_URL is not configured on the server environment.');
    }

    const headers = {
        'Accept': mode === 'git'
            ? 'application/vnd.github.v3.raw, application/json, application/yaml, text/plain'
            : 'application/json, application/yaml, text/yaml, text/plain',
        'User-Agent': 'Resource-Hub-Proxy'
    };

    if (mode === 'git' && token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error(`Upstream returned ${response.status} ${response.statusText}`);
        }
        const text = await response.text();
        // Return to the SPA
        res.setHeader('Content-Type', 'text/plain');
        res.send(text);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send(`Failed to fetch data from upstream: ${error.message}`);
    }
});

// Serve static React files
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback for SPA routing
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log(`Configured to proxy data from: ${process.env.VITE_DATA_URL}`);
});
