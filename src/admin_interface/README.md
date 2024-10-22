# Toddler Puzzle App - Admin Interface

## Overview

Welcome to the Admin Interface of the Toddler Puzzle App. This README provides comprehensive documentation to help you set up, understand, and effectively use the admin interface for managing the application's content and monitoring system activities.

*Addresses Requirement: Documentation and Setup (Technical Specification/System Components/Documentation)*

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Navigate to Admin Interface Directory](#2-navigate-to-admin-interface-directory)
  - [3. Install Dependencies](#3-install-dependencies)
  - [4. Configure Environment Variables](#4-configure-environment-variables)
  - [5. Running the Application](#5-running-the-application)
  - [6. Build for Production](#6-build-for-production)
- [Usage Guidelines](#usage-guidelines)
  - [Accessing Different Pages](#accessing-different-pages)
    - [Login Page](#login-page)
    - [Dashboard Page](#dashboard-page)
    - [Content Management Page](#content-management-page)
    - [Audit Logs Page](#audit-logs-page)
  - [Utilizing Available Features](#utilizing-available-features)
    - [Image Approval](#image-approval)
    - [Content Management](#content-management)
    - [Audit Logs Review](#audit-logs-review)
- [Component and Service Overview](#component-and-service-overview)
  - [Main Components](#main-components)
    - [App.tsx](#apptsx)
    - [index.tsx](#indextsx)
    - [NavigationBar.tsx](#navigationbartsx)
  - [Services](#services)
    - [ApiService.ts](#apiservicets)
    - [AuthService.ts](#authservicets)
  - [Utilities and Configurations](#utilities-and-configurations)
    - [Constants.ts](#constantsts)
    - [GlobalStyles.ts](#globalstylests)
    - [Environment Variables](#environment-variables)
- [Dependencies](#dependencies)
  - [Internal Dependencies](#internal-dependencies)
  - [External Dependencies](#external-dependencies)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (Version 14.x or later)
- **npm** or **yarn** package manager
- Access to the backend server API endpoints
- Administrative privileges to run and manage the interface

*Addresses Requirement: Setup Instructions (Technical Specification/System Components/Documentation)*

## Setup Instructions

Follow these steps to set up the admin interface on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/YourOrganization/ToddlerPuzzleApp.git
```

### 2. Navigate to Admin Interface Directory

```bash
cd ToddlerPuzzleApp/src/admin_interface
```

### 3. Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

*Dependencies are listed in `package.json`.*

### 4. Configure Environment Variables

Create a `.env` file in the root of `src/admin_interface`:

```bash
touch .env
```

Add the following environment-specific variables:

```
REACT_APP_API_BASE_URL=https://api.yourbackend.com
REACT_APP_AUTH_TOKEN=your_auth_token
```

*Ensure that environment variables are kept secure and not committed to version control.*

### 5. Running the Application

To run the application in development mode:

```bash
npm start
```

or

```bash
yarn start
```

*The app will run on `http://localhost:3000` by default.*

### 6. Build for Production

To build the application for production deployment:

```bash
npm run build
```

or

```bash
yarn build
```

*This will create an optimized build in the `build/` directory.*

## Usage Guidelines

### Accessing Different Pages

#### Login Page

- **Path:** `/login`
- **Component:** `LoginPage.tsx`
- **Purpose:** Authenticates administrators to secure access to the admin interface features.

*Ensure you have valid admin credentials provided by the system administrator.*

#### Dashboard Page

- **Path:** `/dashboard`
- **Component:** `DashboardPage.tsx`
- **Purpose:** Provides an overview of pending tasks, system status, and quick access to main functionalities.

#### Content Management Page

- **Path:** `/content-management`
- **Component:** `ContentManagementPage.tsx`
- **Purpose:** Manage AI-generated images, approve or delete content, and ensure quality standards.

*Addresses Requirement: Admin Controls (Technical Specification/Feature 7)*

#### Audit Logs Page

- **Path:** `/audit-logs`
- **Component:** `AuditLogsPage.tsx`
- **Purpose:** View and search through logs of administrative actions for auditing purposes.

*Addresses Requirement: Audit Logging (Technical Specification/Feature 7/TR-7.3)*

### Utilizing Available Features

#### Image Approval

- **Component:** `ImageApproval.tsx`
- **Functionality:** Review AI-generated images pending approval.
- **Actions:**
  - **Approve:** Makes the image available in the app.
  - **Delete:** Removes the image from the pending list.

*Ensure to adhere to content guidelines when approving images.*

#### Content Management

- **Component:** `ContentManagement.tsx`
- **Functionality:** Manage existing content, including editing metadata or removing outdated images.

#### Audit Logs Review

- **Component:** `AuditLogs.tsx`
- **Functionality:** Track administrative activities for compliance and security monitoring.

## Component and Service Overview

### Main Components

#### App.tsx

- **Location:** `src/App.tsx`
- **Purpose:** Main entry point integrating routes and wrapping the application with necessary providers.

*Imports React v17.0.2 and React Router.*

#### index.tsx

- **Location:** `src/index.tsx`
- **Purpose:** Renders the `App` component into the DOM and initializes global configurations.

*Includes version comment: ReactDOM v17.0.2*

#### NavigationBar.tsx

- **Location:** `src/components/NavigationBar.tsx`
- **Purpose:** Provides navigation links to different pages and handles user logout.

### Services

#### ApiService.ts

- **Location:** `src/services/ApiService.ts`
- **Purpose:** Handles HTTP requests to the backend server using `axios` v0.21.1.

*Ensures consistent communication with the backend API endpoints.*

#### AuthService.ts

- **Location:** `src/services/AuthService.ts`
- **Purpose:** Manages authentication logic including login, logout, and token storage.

### Utilities and Configurations

#### Constants.ts

- **Location:** `src/utils/Constants.ts`
- **Purpose:** Defines constant values used throughout the admin interface.

*Ensures consistency and ease of maintenance.*

#### GlobalStyles.ts

- **Location:** `src/styles/GlobalStyles.ts`
- **Purpose:** Contains global CSS styles using `styled-components` v5.3.3.

*Addresses Requirement: User Interface Consistency (Technical Specification/Feature 6)*

#### Environment Variables

- **File:** `.env`
- **Purpose:** Stores environment-specific configurations.

*Keep this file secure and do not commit to version control.*

## Dependencies

### Internal Dependencies

- **App.tsx** (`src/App.tsx`): Main application component.
- **index.tsx** (`src/index.tsx`): Renders the app.
- **Constants.ts** (`src/utils/Constants.ts`): Application constants.
- **ApiService.ts** (`src/services/ApiService.ts`): Backend API communication.
- **Environment Variables** (`.env`): Configuration settings.

### External Dependencies

- **React** (`react` v17.0.2): Base library for building the interface.
- **ReactDOM** (`react-dom` v17.0.2): Renders components to the DOM.
- **styled-components** (`styled-components` v5.3.3): CSS-in-JS styling.
- **axios** (`axios` v0.21.1): HTTP client for API requests.

## Contributing

We welcome contributions from the development team. Please ensure all changes are tested and documented.

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear messages.
4. Submit a pull request for review.

*Refer to the project's CONTRIBUTING guidelines.*

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.