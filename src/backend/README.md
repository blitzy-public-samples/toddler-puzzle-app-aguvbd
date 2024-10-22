# Backend Server - Toddler Puzzle App

This README provides an overview of the backend server setup for the **Toddler Puzzle App**. It includes instructions on configuration, running the server, and understanding the architecture and services involved.

## Table of Contents

- [Introduction](#introduction)
- [Requirements Addressed](#requirements-addressed)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [Project Structure](#project-structure)
- [Services](#services)
- [Routes](#routes)
- [Middleware](#middleware)
- [Utilities](#utilities)
- [Globals](#globals)
- [Dependencies](#dependencies)
- [Notes](#notes)

## Introduction

The backend server is a critical component of the Toddler Puzzle App, responsible for handling business logic, user data management, purchase processing, and interactions with external services like AI image generation APIs and payment gateways.

## Requirements Addressed

- **Backend Documentation**
  - **Location in Documentation**: SYSTEM ARCHITECTURE/Backend Server
  - **Description**: Provides comprehensive documentation for setting up, configuring, and running the backend server, including details on services, routes, and middleware.

## Prerequisites

Before setting up the backend server, ensure you have the following installed:

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **PostgreSQL** (v12.x or higher)

## Installation

Clone the repository and navigate to the backend directory:

```bash
git clone <repository_url>
cd src/backend
```

Install the dependencies:

```bash
npm install
```

## Configuration

The backend server uses configuration files located in `src/config/`. The configuration is environment-specific, with default settings provided in `default.json`.

**Internal Dependencies:**

- **default.json** (`src/config/default.json`): Provides baseline configuration settings for the backend server.
- **production.json** (`src/config/production.json`): Provides production-specific configuration settings.
- **test.json** (`src/config/test.json`): Provides test-specific configuration settings.

Create a `.env` file in the root of `src/backend/` to set the necessary environment variables:

```env
PORT=3000
DATABASE_URL=postgres://dev_user:dev_password@localhost:5432/toddler_puzzle_db
JWT_SECRET=your_default_jwt_secret
AI_IMAGE_API_KEY=your_default_ai_image_api_key
```

**Globals:**

- **PORT**: The port on which the server runs. Defaults to `3000` if not specified.
- **DATABASE_URL**: Connection string for the PostgreSQL database.
- **JWT_SECRET**: Secret key used for JWT token signing and verification.
- **AI_IMAGE_API_KEY**: API key for the AI image generation service.

## Running the Server

### Development Mode

Start the server in development mode with hot-reloading:

```bash
npm run dev
```

### Production Mode

Build the application and start the server:

```bash
npm run build
npm start
```

The server will start on `http://localhost:3000` or the port specified in the `PORT` environment variable.

## Project Structure

```
src/
  backend/
    src/
      app.ts            # Initializes and configures the Express application
      index.ts          # Entry point for the backend server
      config/
        default.json    # Baseline configuration settings
        production.json # Production-specific configuration settings
        test.json       # Test-specific configuration settings
      controllers/      # Handles incoming HTTP requests and responses
      middlewares/      # Custom middleware functions
      models/           # Database models and schemas
      routes/           # API endpoint definitions
      services/         # Business logic and external service integrations
      utils/            # Utility functions and helpers
    tests/              # Automated tests
    package.json        # Project dependencies and scripts
    tsconfig.json       # TypeScript configuration
    .env                # Environment variables
```

## Services

**Location in Documentation**: SYSTEM COMPONENTS/SERVICES

- **AIImageService.ts**
  - Integrates with the AI image generation API to fetch puzzle images.
- **AuthService.ts**
  - Manages user authentication, including JWT token generation and validation.
- **PaymentService.ts**
  - Handles payment processing using Stripe.
- **PuzzleService.ts**
  - Manages puzzle data operations.
- **UserService.ts**
  - Handles user data management.

## Routes

**Location in Documentation**: API DESIGN/Endpoints

- **auth.ts**
  - Endpoints for user registration, login, and logout.
- **users.ts**
  - Endpoints for user profile management.
- **puzzles.ts**
  - Endpoints for retrieving and managing puzzles.
- **purchases.ts**
  - Endpoints for processing purchases.
- **progress.ts**
  - Endpoints for tracking user progress.
- **admin.ts**
  - Admin-specific endpoints for content moderation.

## Middleware

**Location in Documentation**: SYSTEM COMPONENTS/MIDDLEWARE

- **AuthMiddleware.ts**
  - Verifies JWT tokens and authorizes user access.
- **ErrorMiddleware.ts**
  - Centralized error handling for the application.
- **RateLimiterMiddleware.ts**
  - Implements rate limiting to prevent API abuse.

## Utilities

- **Logger.ts** (`src/utils/Logger.ts`)
  - Provides logging utilities using **winston** (`winston@3.3.3`).
- **Validator.ts** (`src/utils/Validator.ts`)
  - Contains data validation functions to ensure request integrity.
- **ResponseHelper.ts** (`src/utils/ResponseHelper.ts`)
  - Standardizes API responses.

## Globals

Globals are defined in the configuration files and environment variables:

- **PORT**
- **DATABASE_URL**
- **JWT_SECRET**
- **AI_IMAGE_API_KEY**

Ensure these are set appropriately in your `.env` file or environment.

## Dependencies

### External Dependencies

Install via `npm install` as per `package.json`.

- **express** (`express@4.17.1`)
  - Web framework for building API endpoints.
- **winston** (`winston@3.3.3`)
  - Logging library for capturing application logs.
- **jsonwebtoken** (`jsonwebtoken@8.5.1`)
  - Library for JWT token handling.
- **axios** (`axios@0.21.1`)
  - Promise-based HTTP client for making API requests.
- **stripe** (`stripe@8.174.0`)
  - Stripe SDK for handling payment processing.

### Internal Dependencies

Refer to the **Project Structure** section for the internal modules and their purposes.

## Notes

- **Technical Requirements Addressed**:
  - **TR-1**: Puzzle Difficulty Levels
  - **TR-2**: AI-Generated Images
  - **TR-3**: One-Time Payment Model
- **Location in Documentation**:
  - **TECHNICAL REQUIREMENTS** and **SYSTEM DESIGN**

Ensure you have read and understood the technical specifications outlined in the documentation to fully grasp the backend server's functionalities and how they adhere to the project's requirements.

---

For any questions or assistance, please refer to the full technical documentation or contact the development team.