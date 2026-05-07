# Retail Pulse Analytics

## Project Architecture

This application follows a modern full-stack architecture, utilizing Docker for containerization to ensure consistency across environments. The system is broken down into three core services:

1. **Database (`mysql-db`)**: 
   - Uses MySQL 8.0 to persist application data. 
   - A dedicated volume is used to ensure data persists across container restarts.

2. **Backend API (`backend-api`)**: 
   - A Java-based application (typically Spring Boot) providing the core business logic and RESTful endpoints.
   - It connects to the `mysql-db` service for data operations.
   - Exposed on port `8080`.

3. **Frontend UI (`frontend-ui`)**: 
   - A React-based single-page application (using Vite for fast building) that serves as the user-facing interface.
   - It communicates with the `backend-api` to fetch and submit data.
   - Exposed on port `5173`.

### Getting Started

To spin up the entire infrastructure locally, ensure you have Docker and Docker Compose installed, then run:

```bash
docker-compose up -d --build
```
