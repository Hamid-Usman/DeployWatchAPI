# 🚀 Helios

**HeliosAPI** is a high-performance observability platform designed for engineering teams to monitor deployments, track API latency, and visualize server health in real-time.

Built as a intermediate level   infrastructure tool, it moves beyond simple CRUD applications to provide deep insights into your system's operational health.

---

## Core Features

-   **📊 Real-time Metrics**: Track API latency and system health using WebSockets (Socket.io) for live updates without page refreshes.
<!-- -   **🚢 Deployment Tracking**: Record CI/CD events to correlate performance changes with specific code deployments. -->
-   **⚠️ Alerting Engine**: Intelligent monitoring that triggers warnings when latency thresholds are exceeded.
-   **🔐 Secure Ingestion**: Project-specific API Keys (`dw_...`) allow any service to push metrics securely.
-   **📖 Up-To-DatGenerated Documentation**: Full Swagger UI integration for interactive API testing.

---

## 🛠 Tech Stack

-   **Framework**: [NestJS](https://nestjs.com/) (TypeScript)
-   **Database**: [MySQL](https://www.mysql.com/) with [TypeORM](https://typeorm.io/)
-   **Real-time**: [Socket.io](https://socket.io/)
-   **Documentation**: [Swagger / OpenAPI](https://swagger.io/)
-   **Security**: JWT Authentication & Header-based API Key Guard

---

## 🚦 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Configuration
Create a `.env` file in the root directory (see `.env.example`):
```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=Helios
JWT_SECRET=your_secret_key
```

### 3. Database Migrations
```bash
# Generate migration
npm run migration:generate

# Run migration
npm run migration:run
```

### 4. Run the App
```bash
# Development
npm run start:dev

# Production build
npm run build
```

---

## 📖 API Documentation

Once the app is running, access the interactive Swagger documentation at:
👉 `http://localhost:3000/api/docs`

---

## 🧪 Codebase Integration

Helios enables real-time observability for any backend application. By integrating lightweight middleware or calling the ingestion endpoints, you can track API latency, health status, and code deployments.

### 1. Ingestion Protocol Specs

All client ingestion requests must include the project-specific API key in the headers:
* **Header**: `x-api-key: dw_YOUR_API_KEY`
* **Base URL**: `http://localhost:3000/api`

#### A. Record Latency & Health Metrics
* **Endpoint**: `POST /metrics`
* **Content-Type**: `application/json`
* **Request Payload**:
  ```json
  {
    "type": "latency", // options: "latency" | "health"
    "value": 142.5    // latency in milliseconds, or 1/0 for health
  }
  ```

#### B. Track CI/CD Deployments
* **Endpoint**: `POST /deployments`
* **Content-Type**: `application/json`
* **Request Payload**:
  ```json
  {
    "version": "1.2.4",
    "environment": "production", // e.g. "production", "staging"
    "status": "success"          // e.g. "success", "failed"
  }
  ```

---

### 2. Integration Examples

#### 🟢 Node.js / Express Middleware (Auto-Latency Ingestion)
Add this middleware to your Express.js app to automatically capture and report the latency of every incoming HTTP request:

```javascript
const axios = require('axios');

const heliosMetricsMiddleware = (apiKey, heliosUrl = 'http://localhost:3000/api') => {
  return (req, res, next) => {
    const start = process.hrtime();

    res.on('finish', () => {
      const diff = process.hrtime(start);
      const latencyInMs = (diff[0] * 1e9 + diff[1]) / 1e6; // Convert to milliseconds

      // Ingest the metric asynchronously without blocking response
      axios.post(`${heliosUrl}/metrics`, {
        type: 'latency',
        value: Number(latencyInMs.toFixed(2))
      }, {
        headers: { 'x-api-key': apiKey }
      }).catch(err => {
        console.error('Failed to report metrics to Helios:', err.message);
      });
    });

    next();
  };
};

// Usage:
// app.use(heliosMetricsMiddleware('dw_your_project_api_key'));
```

#### 🐍 Python / FastAPI Middleware
Integrate real-time metric collection in your Python FastAPI apps using this custom middleware:

```python
import time
import httpx
import asyncio
from fastapi import FastAPI, Request
from starlette.middleware.base import BaseHTTPMiddleware

class HeliosMetricsMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, api_key: str, helios_url: str = "http://localhost:3000/api"):
        super().__init__(app)
        self.api_key = api_key
        self.helios_url = helios_url
        self.client = httpx.AsyncClient()

    async def dispatch(self, request: Request, call_next):
        start_time = time.perf_counter()
        response = await call_next(request)
        process_time = (time.perf_counter() - start_time) * 1000.0 # Convert to ms
        
        # Fire-and-forget metrics upload in background
        asyncio.create_task(self.upload_metric(process_time))
        return response

    async def upload_metric(self, latency: float):
        try:
            await self.client.post(
                f"{self.helios_url}/metrics",
                json={"type": "latency", "value": round(latency, 2)},
                headers={"x-api-key": self.api_key}
            )
        except Exception as e:
            print(f"Failed to report metrics to Helios: {e}")

# Usage:
# app.add_middleware(HeliosMetricsMiddleware, api_key="dw_your_project_api_key")
```

#### 🐍 Python / Django & Django Rest Framework Middleware
Apply real-time telemetry to your Django Rest Framework (DRF) application by creating a custom Django middleware that tracks response times:

1. **Create the middleware file** (e.g. `your_project/middleware.py`):
   ```python
   import time
   import requests
   import threading
   from django.conf import settings

   class HeliosMetricsMiddleware:
       def __init__(self, get_response):
           self.get_response = get_response
           # Pull keys from settings.py (with safe defaults)
           self.api_key = getattr(settings, 'HELIOS_API_KEY', None)
           self.helios_url = getattr(settings, 'HELIOS_URL', 'http://localhost:3000/api')

       def __call__(self, request):
           start_time = time.perf_counter()
           response = self.get_response(request)
           latency_ms = (time.perf_counter() - start_time) * 1000.0

           # Post to Helios in a daemon thread to avoid blocking client response
           if self.api_key:
               threading.Thread(
                   target=self._upload_metric,
                   args=(latency_ms,),
                   daemon=True
                ).start()

           return response

       def _upload_metric(self, latency):
           try:
               requests.post(
                   f"{self.helios_url}/metrics",
                   headers={"x-api-key": self.api_key},
                   json={"type": "latency", "value": round(latency, 2)},
                   timeout=2.0
               )
           except Exception:
               pass  # Keep production resilient if Helios has network hiccups
   ```

2. **Add to your `settings.py`**:
   ```python
   MIDDLEWARE = [
       # ... other middleware ...
       'your_project.middleware.HeliosMetricsMiddleware',
   ]

   HELIOS_API_KEY = 'dw_your_project_api_key'
   HELIOS_URL = 'http://localhost:3000/api' # Optional
   ```

#### 🛠️ GitHub Actions (Automated Deployment Tracking)
Add this step to your GitHub Actions CD pipeline to automatically notify Helios when a deployment finishes:

```yaml
- name: Report Deployment to Helios
  if: success()
  run: |
    curl -X POST "http://localhost:3000/api/deployments" \
      -H "Content-Type: application/json" \
      -H "x-api-key: ${{ secrets.HELIOS_API_KEY }}" \
      -d '{
        "version": "${{ github.sha }}",
        "environment": "production",
        "status": "success"
      }'
```

---

### 3. Real-Time Dashboard Subscription

To visualize live updates on a frontend dashboard, connect to the metrics WebSocket gateway using `socket.io-client`:

```javascript
import { io } from 'socket.io-client';

// Connect to the metrics namespace
const socket = io('http://localhost:3000/metrics');

// 1. Join your project room using its unique ID
socket.emit('joinProject', 'YOUR_PROJECT_UUID');

// 2. Listen for live incoming metrics
socket.on('newMetric', (metric) => {
  console.log('Real-time metric received:', metric);
  // Update your charts, latency monitors, or alerting components here!
});

// 3. Clean up on unmount
// socket.emit('leaveProject', 'YOUR_PROJECT_UUID');
```

---

## 👨‍💻 Author
**Hamid** - Backend Developer - Frontend Developer - UI/UX Designer - QA Engineer - Devops Engineer - Database Administrator
