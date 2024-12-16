const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Authorization Token
const AUTH_TOKEN = process.env.AUTH_TOKEN || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJleHAiOjE3MzQzODE2NzEsImlzcyI6IkFpcmxpbmVDb21wYW55QVBJIiwiYXVkIjoiQWlybGluZUNvbXBhbnlVc2VycyJ9.-Qpc2jQPKhPT2cHZ-8p9xhbJLrN8ApjFGlJYuro7JMU";

// Base URL
const BASE_URL = 'https://airlinecompanyapi20241128160828.azurewebsites.net';

// Helper middleware to stream body for POST
function fixRequestBody(proxyReq, req) {
    if (req.body && req.method === 'POST') {
        const bodyData = JSON.stringify(req.body);

        // Update headers
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));

        // Write body to proxy request
        proxyReq.write(bodyData);
        proxyReq.end();
    }
}

// Proxy Middleware for QueryFlights (GET)
app.use('/flights', createProxyMiddleware({
    target: `${BASE_URL}/v1/Flight/QueryFlights`,
    changeOrigin: true,
    onProxyReq: (proxyReq) => {
        proxyReq.setHeader('Authorization', `Bearer ${AUTH_TOKEN}`);
    }
}));

// Proxy Middleware for Book Ticket (POST)
app.use('/book', createProxyMiddleware({
    target: `${BASE_URL}/v1/Ticket/Book`,
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
        proxyReq.setHeader('Authorization', `Bearer ${AUTH_TOKEN}`);
        fixRequestBody(proxyReq, req);
    }
}));

// Proxy Middleware for CheckIn (POST)
app.use('/checkin', createProxyMiddleware({
    target: `${BASE_URL}/v1/Ticket/CheckIn`,
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
        proxyReq.setHeader('Authorization', `Bearer ${AUTH_TOKEN}`);
        fixRequestBody(proxyReq, req);
    }
}));

// Start API Gateway
app.listen(PORT, () => {
    console.log(`API Gateway is running at http://localhost:${PORT}`);
    console.log(`QueryFlights -> http://localhost:${PORT}/flights`);
    console.log(`Book Ticket -> http://localhost:${PORT}/book`);
    console.log(`CheckIn -> http://localhost:${PORT}/checkin`);
});
