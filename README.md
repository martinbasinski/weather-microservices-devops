# Weather Microservices DevOps Project

A comprehensive weather application built with microservices architecture and modern DevOps practices.

## 🌟 Key Features

- **Microservices Architecture**
 - Frontend (React.js)
 - Backend API (Node.js/Express)
 - Containerization system (Docker)

- **DevOps Pipeline**
 - CI/CD (GitHub Actions)
 - Automated testing
 - Automated deployments

- **Containerization & Orchestration**
 - Docker
 - Docker Compose
 - Kubernetes
 - Automatic scaling (HPA)

- **Monitoring**
 - Prometheus
 - Grafana
 - Application metrics
 - Health checks

## 🛠 Tech Stack

- **Frontend**: React.js, Chart.js
- **Backend**: Node.js, Express
- **Containerization**: Docker, Docker Compose
- **Orchestration**: Kubernetes, Minikube
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus, Grafana
- **API**: Open-Meteo Weather API
- **Infrastructure as Code**: Kubernetes manifests

## 🚀 Getting Started

### Local Development

```bash
# Run with Docker Compose
docker-compose up

# Frontend: http://localhost:3001
# Backend: http://localhost:3000


Kubernetes Deployment
# Start Minikube
minikube start

# Apply Kubernetes configuration
kubectl apply -f kubernetes/

# Enable Ingress
minikube addons enable ingress

# Enable monitoring
kubectl apply -f monitoring/

Monitoring

Prometheus: Metrics collection

Request count
Response time
Resource utilization


Grafana Dashboards

Application metrics
System metrics
Custom dashboards



🔄 CI/CD Pipeline

Build

Unit testing
Docker image building
Security scanning


Deploy

Automatic deployment to Kubernetes
Rolling updates
Zero-downtime deployments



🎯 DevOps Features

Scalability

Horizontal Pod Autoscaling
Load Balancing
Resource Limits & Requests


Reliability

Health Checks
Liveness & Readiness Probes
Automatic Restarts


Security

CORS
Environment Variables
ConfigMaps & Secrets