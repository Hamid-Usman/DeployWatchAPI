# 🚀 DeployWatch

**DeployWatchAPI** is a high-performance observability platform designed for engineering teams to monitor deployments, track API latency, and visualize server health in real-time.

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
DB_NAME=deploywatch
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

Work in Progress...............

---

## 👨‍💻 Author
**Hamid** - Backend Developer - Frontend Developer - UI/UX Designer - QA Engineer - Devops Engineer - Database Administrator
