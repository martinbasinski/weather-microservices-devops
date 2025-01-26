const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const promClient = require('prom-client');

// Create a Registry to register metrics
const register = new promClient.Registry();

// Create metrics
const httpRequestDuration = new promClient.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.5, 1, 5]
});

const totalRequests = new promClient.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'code']
});

// Register metrics
register.registerMetric(httpRequestDuration);
register.registerMetric(totalRequests);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Middleware to track metrics
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = (Date.now() - start) / 1000;
        httpRequestDuration.observe(
            {
                method: req.method,
                route: req.route?.path || req.path,
                code: res.statusCode
            },
            duration
        );
        totalRequests.inc({
            method: req.method,
            route: req.route?.path || req.path,
            code: res.statusCode
        });
    });
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// Routes
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Backend service running on port ${port}`);
});