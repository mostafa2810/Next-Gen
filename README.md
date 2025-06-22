# Next-Gen React Application

This is a React application with Docker configuration for easy deployment.

## Docker Setup

The application is containerized using Docker with Nginx as a web server.

### Prerequisites

- Docker
- Docker Compose

### Running the Application

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd next-gen
   ```

2. Build and start the containers:
   ```bash
   docker-compose up -d
   ```

3. Access the application:
   Open your browser and navigate to `http://localhost`

### Development Mode

If you want to run the application in development mode without Docker:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Access the application:
   Open your browser and navigate to `http://localhost:5173`

### Building for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Docker Configuration

The Docker setup consists of:

- **Nginx**: Serves the built React application and handles routing
- **Multi-stage build**: Optimizes the Docker image size by using a build stage and a production stage

## Configuration Files

- `Dockerfile.nginx`: Builds the React application and sets up Nginx
- `nginx.conf`: Nginx server configuration
- `docker-compose.yml`: Orchestrates the Docker services
- `.dockerignore`: Specifies files to exclude from the Docker build context 