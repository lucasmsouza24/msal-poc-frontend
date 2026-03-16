# MSAL POC Frontend

![React](https://img.shields.io/badge/react-frontend-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/typescript-static%20typing-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-build%20tool-646CFF?logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/docker-containerized-2496ED?logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-orchestration-326CE5?logo=kubernetes&logoColor=white)

## Overview

This repository contains the **frontend application** used to test authentication with the Microsoft Identity Platform using **MSAL**.

The goal of this project is purely educational: to understand how MSAL authentication works in a real application architecture using a frontend and backend separation.

This frontend application is responsible for:

- Providing a simple interface for users to start the authentication flow
- Redirecting users to Microsoft login
- Receiving the authentication response
- Communicating with the backend API

The backend service handles the authentication callback and persists authentication events in a database.

Backend repository:

https://github.com/lucasmsouza24/msal-poc-api

---

# Architecture

The project is composed of two repositories:

**Frontend (this repository)**  
React application that triggers the MSAL authentication flow.

**Backend API**  
FastAPI service responsible for:

- Handling the MSAL callback
- Validating authentication responses
- Persisting authentication logs in PostgreSQL

---

# Requirements

This project was developed and tested on **Linux (Zorin OS 18)**.

Other Linux distributions should work, but the provided automation scripts assume a Linux environment.

### Runtime versions used

- Node.js **v24.13.0**
- React + TypeScript
- Vite

---

# Required Tools

Depending on the environment you choose, you will need:

### Option 1 — Docker

Required tools:

- Docker
- GNU Make

Start the frontend container using:

~~~bash
make docker-up
~~~

If your system requires `sudo` to run Docker commands, you may need to modify the Makefile and prefix Docker commands with `sudo`.

---

### Option 2 — Kubernetes (Minikube)

Required tools:

- Docker
- Minikube
- kubectl
- mkcert
- GNU Make

Before building the environment make sure a cluster is running:

~~~bash
minikube start
~~~

---

# Environment Variables

Create a `.env` file based on `.env.example`.

~~~bash
cp .env.example .env
~~~

These values must match the configuration used by the backend API.

Refer to the backend repository for details:

https://github.com/lucasmsouza24/msal-poc-api

---

# Running with Docker

To start the frontend container locally:

~~~bash
make docker-up
~~~

This command will:

1. Build the Docker image
2. Start the container
3. Stream container logs

The application will be available at:

~~~
http://localhost:5173
~~~

---

# Running with Kubernetes (Minikube)

The Kubernetes environment simulates a production-like setup by configuring a **local DNS and Ingress**.

This allows both the frontend and backend to be accessed through a local domain instead of `localhost`.

## Install mkcert

Azure only allows authentication redirect URIs that begin with:

- `http://localhost`
- `https://`

To support a custom local domain (`https://msal.local`), this project uses **mkcert** to generate a trusted local TLS certificate.

Install mkcert before running the Kubernetes environment.

Example (Debian/Ubuntu based systems):

~~~bash
sudo apt install mkcert
~~~

You can also install it following the official instructions:

https://github.com/FiloSottile/mkcert

---

## Start the Kubernetes Environment

Make sure your cluster is running:

~~~bash
minikube start
~~~

Then run:

~~~bash
make k8s-build
~~~

This command will automatically:

1. Install and configure the **NGINX Ingress controller**
2. Generate a local TLS certificate using **mkcert**
3. Create a Kubernetes TLS secret
4. Configure a local DNS entry in `/etc/hosts`
5. Deploy the frontend application

The application will be available at:

~~~
https://msal.local
~~~

# Notes

- This project is intended for **learning and experimentation**
- It is not designed for production usage
- The frontend depends on the backend API to complete the authentication flow

Backend repository:

https://github.com/lucasmsouza24/msal-poc-api
