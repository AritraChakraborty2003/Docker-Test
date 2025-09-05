# MERN Backend API

A simple Node.js Express server with IP detection and configuration management.

## Features

- 🌐 IP detection for all incoming requests
- ⚙️ Configuration management with environment variables
- 🔍 Health check endpoints
- 📊 Server and client information display
- 🚀 Hot reload with nodemon for development

## Installation

1. Navigate to the project directory:

   ```bash
   cd mern-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   Or start the production server:

   ```bash
   npm start
   ```

## API Endpoints

### `GET /`

Main route that returns:

- Welcome message and server status
- Application configuration
- Client information (IP, user agent, headers)
- Server information (hostname, platform, memory usage)

### `GET /health`

Health check endpoint that returns server status and uptime.

### `GET /api/info`

API information endpoint with client request details.

## Configuration

The application uses environment variables defined in `.env`:

- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment mode (default: development)
- `APP_NAME`: Application name
- `VERSION`: Application version

## Example Response

When you visit `http://localhost:5000/`, you'll get a JSON response with:

```json
{
  "message": "Welcome to MERN Backend API!",
  "status": "Server is running successfully",
  "config": {
    "appName": "MERN Backend API",
    "version": "1.0.0",
    "nodeEnv": "development",
    "port": 5000,
    "timezone": "UTC",
    "serverTime": "2024-01-15T10:30:00.000Z"
  },
  "client": {
    "ip": "::1",
    "userAgent": "Mozilla/5.0...",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "connectionInfo": {
      "host": "localhost:5000",
      "protocol": "http",
      "secure": false,
      "method": "GET",
      "url": "/"
    }
  },
  "server": {
    "hostname": "YOUR-COMPUTER",
    "platform": "win32",
    "nodeVersion": "v18.17.0",
    "uptime": 45.123,
    "memoryUsage": {
      "rss": 29360128,
      "heapTotal": 7684096,
      "heapUsed": 5678904,
      "external": 1089456,
      "arrayBuffers": 17872
    }
  }
}
```

## Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with hot reload
- `npm test`: Run tests (placeholder)

## Dependencies

- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **request-ip**: IP address detection
- **nodemon**: Development server with hot reload (dev dependency)
