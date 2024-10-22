# Toddler Puzzle App

<!--
This README addresses the requirement: "Ensure comprehensive documentation is available to guide developers, administrators, and users in understanding and utilizing the Toddler Puzzle App."
Location: Technical Specification/Documentation
-->

Welcome to the **Toddler Puzzle App** repository! This project aims to enhance toddlers' cognitive development through interactive puzzle solving. The app leverages AI to produce a variety of engaging puzzles, ensuring freshness and diversity for young users.

## Introduction

<!--
Provides an overview of the Toddler Puzzle App, including its purpose, key features, and target audience.
-->

The **Toddler Puzzle App** is an educational mobile application designed for toddlers aged 2-5 years. It offers an engaging platform that combines fun and learning through puzzle-solving activities.

**Key Features:**

- **AI-Generated Images:** Integrates with AI services like DALL-E to generate colorful and diverse puzzle images. *(See Technical Requirements TR-2 in the Technical Specification)*
- **Puzzle Difficulty Levels:** Offers 4-piece (Starter), 9-piece (Advanced), and 16-piece (Genius) puzzles to cater to various developmental stages. *(Refer to TR-1)*
- **User-Friendly Design:** Features an intuitive interface with large icons and simple navigation tailored for toddlers. *(Refer to TR-6)*
- **Parental Controls:** Provides parents with robust tools to manage content, control purchases, set usage limits, and monitor activity. *(Refer to TR-5)*
- **Offline Playability:** Allows access to puzzles without an internet connection, ensuring uninterrupted play. *(Refer to TR-4)*
- **One-Time Payment Model:** Implements an affordable one-time payment to unlock additional puzzles without recurring charges. *(Refer to TR-3)*

## System Architecture

<!--
Outlines the high-level architecture of the app, including the mobile application, backend server, AI integration, and infrastructure components.
-->

The app is structured into several key components:

- **Mobile Application:** Built with React Native (TypeScript) for cross-platform compatibility on iOS and Android devices. *(Technical Specification/System Architecture)*
- **Backend Server:** Developed using Node.js (TypeScript) with Express.js, it handles business logic, user authentication, data management, and API integrations. *(Refer to System Components)*
- **AI Integration:** Utilizes Python-based services to interact with the DALL-E API for generating puzzle images. *(Refer to TR-2)*
- **Database:** Employs PostgreSQL for robust and scalable relational data storage. *(Refer to Database Design)*
- **Admin Interface:** Created with React.js (TypeScript), allowing administrators to review and manage AI-generated content. *(Refer to TR-7)*
- **Infrastructure:** Hosted on AWS, using services like EC2, RDS, S3, and EKS for scalable and secure deployment. *(Refer to Infrastructure)*

For detailed architectural diagrams, please visit the [System Architecture Documentation](docs/SystemArchitecture.md).

## Setup and Installation

<!--
Guides users through the process of setting up the app, including prerequisites, installation steps, and configuration.
-->

### Prerequisites

- **Node.js** v14.x or higher
- **npm** v6.x or higher
- **Python** 3.8 or higher
- **PostgreSQL** 12 or higher
- **AWS Account** (for deployment)
- **Stripe Account** (for payment processing)

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/toddler-puzzle-app.git
   cd toddler-puzzle-app
   ```

2. **Backend Setup**

   ```bash
   cd src/backend
   npm install
   cp .env.example .env
   # Configure your environment variables in the .env file
   npm run build
   npm start
   ```

   For detailed instructions, refer to the [Backend README](src/backend/README.md).

3. **Mobile Application Setup**

   ```bash
   cd src/web
   npm install
   npm run ios   # For iOS simulator
   npm run android   # For Android emulator
   ```

   For more information, see the [Web Interface README](src/web/README.md).

4. **Admin Interface Setup**

   ```bash
   cd src/admin_interface
   npm install
   npm start
   ```

   Additional details are available in the [Admin Interface README](src/admin_interface/README.md).

5. **Database Setup**

   Set up the PostgreSQL database:

   - Run the migration scripts located in `src/database/migrations/`.
   - Seed the database with initial data from `src/database/seeds/`.

   Refer to the [Database README](src/database/README.md) for comprehensive guidance.

6. **AI Integration Setup**

   ```bash
   cd src/ai_integration
   pip install -r requirements.txt
   cp .env.example .env
   # Configure your environment variables in the .env file
   python src/main.py
   ```

   See the [AI Integration README](src/ai_integration/README.md) for more information.

7. **Infrastructure Setup**

   Use the Terraform scripts provided to set up the AWS infrastructure:

   ```bash
   cd infrastructure/terraform
   terraform init
   terraform apply
   ```

   Follow the instructions in the [Infrastructure README](infrastructure/README.md).

## Usage

<!--
Explains how to use the app, including navigating the user interface and accessing various features.
-->

### For Toddlers

- **Starting a Puzzle:**
  - Open the app to access the home screen with various puzzle themes.
  - Select a theme and choose a difficulty level (4, 9, or 16 pieces).
  - Drag and drop pieces to complete the puzzle.

- **Receiving Rewards:**
  - Enjoy animations and sounds upon puzzle completion.

### For Parents

- **Parental Controls:**
  - Access settings to manage usage limits and app preferences.
  - Monitor your child's progress through the activity dashboard.

- **Purchases:**
  - Unlock additional puzzles via a one-time purchase in the app.
  - Secure transactions are processed through Stripe. *(Refer to TR-3)*

### For Administrators

- **Content Management:**
  - Log in to the admin interface to review AI-generated images.
  - Approve or delete content to ensure quality and appropriateness. *(Refer to TR-7)*

For a detailed user guide, please refer to the [User Interface Documentation](docs/UserInterfaceDesign.md).

## Documentation

<!--
Links to detailed documentation for each component of the app, including the web interface, backend, admin interface, database, AI integration, and infrastructure.
-->

- **Web Interface (Mobile Application):** [Web Interface README](src/web/README.md)
- **Backend Server:** [Backend README](src/backend/README.md)
- **Admin Interface:** [Admin Interface README](src/admin_interface/README.md)
- **Database:** [Database README](src/database/README.md)
- **AI Integration:** [AI Integration README](src/ai_integration/README.md)
- **Infrastructure:** [Infrastructure README](infrastructure/README.md)

Additional resources:

- **Technical Specifications:** [Technical Specifications Document](docs/TechnicalSpecifications.md)
- **API Documentation:** [API Documentation](docs/APIDocumentation.md)
- **System Architecture:** [System Architecture Documentation](docs/SystemArchitecture.md)
- **Contribution Guidelines:** [Contributing](CONTRIBUTING.md)

## Contributing

<!--
Provides guidelines for contributing to the project, including coding standards, testing practices, and submission procedures.
-->

We welcome contributions from the community!

**How to Contribute:**

1. **Fork the Repository** on GitHub.
2. **Create a Branch** for your feature or bug fix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit Your Changes** with clear and descriptive messages.
4. **Push to Your Fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Submit a Pull Request** to the `develop` branch of the main repository.

**Guidelines:**

- Follow the **Coding Standards** outlined in the [Coding Standards Document](docs/CodingStandards.md).
- Write **Unit Tests** for new features and ensure all tests pass.
- Maintain **Documentation** for any new components or significant changes.

For more detailed information, please see the [Contribution Guidelines](CONTRIBUTING.md).

## License

<!--
Details the licensing terms under which the Toddler Puzzle App is distributed.
-->

This project is licensed under the **MIT License**. By contributing, you agree that your contributions will be licensed under the MIT License as well.

See the [LICENSE](LICENSE) file for more details.

---

*This README provides comprehensive documentation to guide developers, administrators, and users in understanding and utilizing the Toddler Puzzle App, addressing the requirement specified in the Technical Specification under "Project Overview and Documentation".*