const express = require("express");
const cors = require("cors");
const requestIp = require("request-ip");
require("dotenv").config();
const config = require("./config/config");

const app = express();

// Middleware
app.use(cors(config.server.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IP detection middleware
app.use(requestIp.mw());

// Helper function to get client info
const getClientInfo = (req) => {
  return {
    ip: req.clientIp,
    userAgent: req.get("User-Agent"),
    timestamp: new Date().toISOString(),
    headers: {
      "x-forwarded-for": req.get("X-Forwarded-For"),
      "x-real-ip": req.get("X-Real-IP"),
      "x-forwarded-proto": req.get("X-Forwarded-Proto"),
      host: req.get("Host"),
      origin: req.get("Origin"),
      referer: req.get("Referer"),
    },
  };
};

// Basic route with IP detection and config info
app.get("/", (req, res) => {
  const clientInfo = getClientInfo(req);

  res.json({
    message: `Welcome to ${config.appName}!`,
    status: "Server is running successfully",
    config: {
      appName: config.appName,
      version: config.version,
      nodeEnv: config.nodeEnv,
      port: config.port,
      timezone: config.app.timezone,
      serverTime: new Date().toISOString(),
    },
    client: {
      ip: clientInfo.ip,
      userAgent: clientInfo.userAgent,
      timestamp: clientInfo.timestamp,
      connectionInfo: {
        host: clientInfo.headers.host,
        protocol: req.protocol,
        secure: req.secure,
        method: req.method,
        url: req.originalUrl,
      },
    },
    server: {
      hostname: require("os").hostname(),
      platform: require("os").platform(),
      nodeVersion: process.version,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
    },
  });
});

// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: config.version,
  });
});

// API info route
app.get("/api/info", (req, res) => {
  const clientInfo = getClientInfo(req);

  res.json({
    api: {
      name: config.appName,
      version: config.version,
      environment: config.nodeEnv,
    },
    request: {
      ip: clientInfo.ip,
      method: req.method,
      url: req.originalUrl,
      headers: clientInfo.headers,
      timestamp: clientInfo.timestamp,
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message:
      config.nodeEnv === "development" ? err.message : "Internal server error",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  const clientInfo = getClientInfo(req);

  res.status(404).json({
    error: "Route not found",
    message: `The requested route ${req.originalUrl} was not found`,
    client: {
      ip: clientInfo.ip,
      method: req.method,
      url: req.originalUrl,
    },
    timestamp: new Date().toISOString(),
  });
});

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 ${config.appName} is running on port ${PORT}`);
  console.log(`📍 Environment: ${config.nodeEnv}`);
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
});

module.exports = app;
