# Toddler Puzzle App - Web Interface

<!--
This README file addresses the requirement for comprehensive documentation as specified in the Technical Specification under "Development Practices - Documentation". It serves to guide developers in setting up, using, and contributing to the project.
Location: Technical Specification/Development Practices/Documentation
-->

## Introduction

Welcome to the **Toddler Puzzle App's web interface**. This project is part of the Toddler Puzzle App designed to enhance toddlers' cognitive development through interactive puzzle solving.

Key Features:

- **Educational Engagement**: Interactive puzzles suitable for toddlers aged 2-5 years.
- **User-Friendly Design**: Intuitive and colorful interface tailored for young users.
- **Parental Oversight**: Tools for parents to monitor and adjust app settings.
- **Accessibility**: Offline playability ensuring access without internet dependency.
- **Dynamic Content Generation**: AI-generated images providing fresh and diverse puzzles.

For more details on the system objectives and scope, refer to the [Technical Specification](../docs/Technical_Specification.md).

## Setup Instructions

This section guides developers through the process of setting up the development environment.

### Prerequisites

- **Node.js** (>=16.x.x)
- **npm** (>=8.x.x)
- **TypeScript** (as per `tsconfig.json`)

### Installation

<!--
The installation process utilizes `package.json` to manage project dependencies, scripts, and metadata.
Dependency: package.json (src/web/package.json)
Purpose: To provide information about project dependencies, scripts, and metadata.
-->

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/toddler-puzzle-app.git
   ```

2. **Navigate to the web interface directory:**

   ```bash
   cd toddler-puzzle-app/src/web
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

   This command installs all necessary packages as defined in [`package.json`](./package.json).

### Running the Application

<!--
The entry point of the application is defined in `index.js`, which renders the main component from `App.tsx`.
Dependencies:
- index.js (src/web/index.js)
  Purpose: To explain the entry point for the web application.
- App.tsx (src/web/App.tsx)
  Purpose: To describe the main application structure and components.
-->

1. **Start the development server:**

   ```bash
   npm start
   ```

   This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

2. **Building for Production:**

   ```bash
   npm run build
   ```

   Builds the app for production to the `build` folder.

### TypeScript Configuration

<!--
TypeScript settings are specified in `tsconfig.json`, ensuring code adheres to defined standards.
Dependency: tsconfig.json (src/web/tsconfig.json)
Purpose: To outline TypeScript configuration settings.
-->

TypeScript is used for type safety and code reliability. Configuration details can be found in [`tsconfig.json`](./tsconfig.json).

### Linting and Code Quality

<!--
Linting rules and code quality standards are defined in `.eslintrc.js`.
Dependency: .eslintrc.js (src/web/.eslintrc.js)
Purpose: To specify linting rules and code quality standards.
-->

Ensure code follows the project's coding standards by running:

```bash
npm run lint
```

Configuration can be found in [`.eslintrc.js`](./.eslintrc.js).

## Usage Guidelines

This section explains how to use the application, including navigation and key functionalities.

### Navigating the App

- **Home Screen:** Provides access to different puzzle categories.
- **Puzzle Selection:** Users can select puzzles of varying difficulty levels (4, 9, 16 pieces).
- **Puzzle Gameplay:** Interactive drag-and-drop interface for assembling puzzles.
- **Parental Controls:** Accessible settings for parents to monitor and adjust app usage.

### Key Functionalities

- **Offline Playability:** Puzzles can be downloaded and played without an internet connection.
- **Dynamic Content:** Integration with AI services to fetch new puzzles.

Refer to the [User Interface Design](../docs/User_Interface_Design.md) in the Technical Specification for detailed insights.

## Development Practices

Outlines coding standards, testing practices, and contribution guidelines for developers.

### Coding Standards

- **Language:** TypeScript is used throughout the project for type safety.
- **Style Guide:** Adheres to the style guidelines defined in [`.eslintrc.js`](./.eslintrc.js).
- **Formatting:** Use Prettier for code formatting.

### Testing Practices

<!--
Testing configurations are detailed in `jest.config.js`.
Dependency: jest.config.js (src/web/jest.config.js)
Purpose: To detail testing configuration and setup.
-->

- **Framework:** Uses Jest for testing JavaScript and TypeScript code.
- **Running Tests:**

  ```bash
  npm test
  ```

- **Configuration:** Test settings are defined in [`jest.config.js`](./jest.config.js).

### Contribution Guidelines

- **Branching Model:** Use feature branches for new features and bug fixes.
- **Commit Messages:** Follow the Conventional Commits specification.
- **Pull Requests:** Ensure all checks pass before submitting a pull request.

For detailed guidelines, refer to the [Contributing](../CONTRIBUTING.md) document.

---

<!--
**Requirements Addressed:**

- **Documentation:** This README provides comprehensive guidance as per the requirement in "Technical Specification/Development Practices/Documentation".
  Location: Technical Specification/Development Practices/Documentation

**Dependencies:**

- **package.json** (src/web/package.json): Provides project dependencies and scripts.
- **App.tsx** (src/web/App.tsx): Contains the main application component.
- **index.js** (src/web/index.js): Serves as the entry point of the application.
- **tsconfig.json** (src/web/tsconfig.json): Defines TypeScript configurations.
- **jest.config.js** (src/web/jest.config.js): Configures the Jest testing framework.
- **.eslintrc.js** (src/web/.eslintrc.js): Specifies linting rules and code standards.
-->