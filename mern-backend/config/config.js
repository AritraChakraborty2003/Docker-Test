const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  appName: process.env.APP_NAME || "MERN Backend API",
  version: process.env.VERSION || "1.0.0",

  // Server configuration
  server: {
    host: process.env.HOST || "localhost",
    protocol: process.env.PROTOCOL || "http",
    cors: {
      origin: process.env.CORS_ORIGIN || "*",
      credentials: true,
    },
  },

  // Application settings
  app: {
    timezone: process.env.TIMEZONE || "UTC",
    logLevel: process.env.LOG_LEVEL || "info",
  },
};

module.exports = config;
