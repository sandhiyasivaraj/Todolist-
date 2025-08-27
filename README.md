# 📝 Todolist (Vite + React)

A simple **React + Vite** application to manage daily tasks. This guide explains how to set up and run the app **locally** and with **Docker (hot reloading)**.

---

## ⚡ Prerequisites

- **Node.js** v18+ (includes npm)
- **Git**

_For Docker-based development (optional):_

- **Docker Desktop** (Windows/Mac) or **Docker Engine** (Linux)
- **Docker Compose** (bundled with Docker Desktop; install separately on Linux)

---

## 🛠️ Local Setup (no Docker)

1. **Clone the repository**

   ```bash
   git clone https://github.com/sandhiyasivaraj/Todolist-.git
   cd Todolist-
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. Open the app:
   [http://localhost:5173](http://localhost:5173)

---

## 🔑 Environment Variables

Currently, the app does not require environment variables. If you add any in the future, create a `.env` file in the project root. Vite only exposes variables prefixed with `VITE_` to the client.

**Example:**

```env
VITE_API_URL=http://localhost:4000
```

---

## 🐳 Docker Setup (with Hot Reloading)

The project supports Dockerized development with **live reload** so your local code changes reflect instantly inside the container.

### 1) Create the Docker files (if not already present)

**Dockerfile** (project root):

```dockerfile
# Use Node.js lightweight image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Expose Vite default dev port
EXPOSE 5173

# Start Vite in dev mode; --host allows access from outside the container
CMD ["npm", "run", "dev", "--", "--host"]
```

**docker-compose.yml** (project root):

```yaml
services:
  vite-app:
    build: .
    container_name: vite-hot-reload
    ports:
      - "5173:5173"
    volumes:
      - .:/app # Mount project source
      - /app/node_modules # Keep container's node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true # Ensures file watching works in Docker
```

> Note: Compose V2 ignores a top-level `version:` key; omit it to avoid warnings.

### 2) Start Docker Desktop / Engine

- Windows/Mac: launch **Docker Desktop** and wait until it shows **running**.
- Linux: ensure the daemon is running (e.g., `systemctl status docker`).

### 3) Build & run the container

```bash
docker-compose up --build
```

Access the app at:
[http://localhost:5173](http://localhost:5173)

### 4) Hot reload behavior

- Edit files under `src/` on your host; the running app reloads automatically.
- No need to rebuild the image on every change thanks to the bind mount.

---

## 📂 Project Structure

```
Todolist-/
 ┣ src/               # React components & logic
 ┣ public/            # Static assets
 ┣ Dockerfile         # Docker build instructions (dev)
 ┣ docker-compose.yml # Compose setup for hot reloading
 ┣ package.json
 ┗ README.md
```

---

## 🚀 NPM Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm install`     | Install dependencies                 |
| `npm run dev`     | Start Vite dev server                |
| `npm run build`   | Create optimized production build    |
| `npm run preview` | Preview the production build locally |

---

## 📄 License

This project is for demonstration purposes.
