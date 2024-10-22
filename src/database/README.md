# Toddler Puzzle App - Database Documentation

<!--
Requirements Addressed:
- **Database Setup Documentation**
  - Location: Technical Specification/Database Design
  - Description: Provides comprehensive instructions for setting up the database, running migrations, and seeding initial data.
-->

## Introduction

This document provides instructions for setting up the database for the Toddler Puzzle App, including running migrations and seeding initial data. It covers the necessary steps to ensure the database is properly configured and ready for use by the backend services.

## Prerequisites

- **PostgreSQL 13** or higher installed on your system.
- Access to the `db_config.json` file located at `src/database/db_config.json`.

## Configuration

<!--
Refer to the "Configuration" section in the Technical Specification.
-->

1. **Database Connection Settings**:

   The database connection settings are specified in the `db_config.json` file. Ensure the following fields are correctly set:

   ```json
   {
     "host": "localhost",
     "port": 5432,
     "database": "toddler_puzzle_app",
     "user": "your_db_username",
     "password": "your_db_password"
   }
   ```

   Replace `your_db_username` and `your_db_password` with your PostgreSQL credentials.

## Setting Up the Database

### 1. Create the Database

Run the following command to create the database:

```bash
createdb -U your_db_username toddler_puzzle_app
```

### 2. Running Migrations

<!--
Refer to the "Migrations" section in the Technical Specification.
-->

The database migrations are located in the `src/database/migrations` directory and should be run in sequence to set up the database schema.

#### Migration Files:

1. **001_create_users_table.sql**
   - Purpose: Creates the `users` table.
   - Location: `src/database/migrations/001_create_users_table.sql`

2. **002_create_puzzles_table.sql**
   - Purpose: Creates the `puzzles` table.
   - Location: `src/database/migrations/002_create_puzzles_table.sql`

3. **003_create_purchases_table.sql**
   - Purpose: Creates the `purchases` table.
   - Location: `src/database/migrations/003_create_purchases_table.sql`

4. **004_create_progress_table.sql**
   - Purpose: Creates the `progress` table.
   - Location: `src/database/migrations/004_create_progress_table.sql`

5. **005_create_admin_logs_table.sql**
   - Purpose: Creates the `admin_logs` table.
   - Location: `src/database/migrations/005_create_admin_logs_table.sql`

6. **006_create_sessions_table.sql**
   - Purpose: Creates the `sessions` table.
   - Location: `src/database/migrations/006_create_sessions_table.sql`

#### Executing Migrations:

Run each migration file in order using the following commands:

```bash
psql -U your_db_username -d toddler_puzzle_app -f src/database/migrations/001_create_users_table.sql
psql -U your_db_username -d toddler_puzzle_app -f src/database/migrations/002_create_puzzles_table.sql
psql -U your_db_username -d toddler_puzzle_app -f src/database/migrations/003_create_purchases_table.sql
psql -U your_db_username -d toddler_puzzle_app -f src/database/migrations/004_create_progress_table.sql
psql -U your_db_username -d toddler_puzzle_app -f src/database/migrations/005_create_admin_logs_table.sql
psql -U your_db_username -d toddler_puzzle_app -f src/database/migrations/006_create_sessions_table.sql
```

### 3. Seeding Data

<!--
Refer to the "Seeding Data" section in the Technical Specification.
-->

Seed scripts are available in the `src/database/seeds` directory to populate the database with initial data for testing and development purposes.

#### Seed Files:

1. **seed_users.sql**
   - Purpose: Populates the `users` table with initial user data.
   - Location: `src/database/seeds/seed_users.sql`

2. **seed_puzzles.sql**
   - Purpose: Populates the `puzzles` table with initial puzzle data.
   - Location: `src/database/seeds/seed_puzzles.sql`

3. **seed_admins.sql**
   - Purpose: Populates the `admin_logs` table with initial admin data.
   - Location: `src/database/seeds/seed_admins.sql`

#### Executing Seed Scripts:

Run each seed file using the following commands:

```bash
psql -U your_db_username -d toddler_puzzle_app -f src/database/seeds/seed_users.sql
psql -U your_db_username -d toddler_puzzle_app -f src/database/seeds/seed_puzzles.sql
psql -U your_db_username -d toddler_puzzle_app -f src/database/seeds/seed_admins.sql
```

## Database Schema

<!--
Refer to the "Database Schema" section in the Technical Specification.
-->

Schema definitions are provided in the `src/database/schemas` directory, detailing the structure and constraints of each table in the database.

### Schema Files:

1. **user_schema.sql**
   - Defines the structure of the `users` table.
   - Location: `src/database/schemas/user_schema.sql`

2. **puzzle_schema.sql**
   - Defines the structure of the `puzzles` table.
   - Location: `src/database/schemas/puzzle_schema.sql`

3. **purchase_schema.sql**
   - Defines the structure of the `purchases` table.
   - Location: `src/database/schemas/purchase_schema.sql`

4. **progress_schema.sql**
   - Defines the structure of the `progress` table.
   - Location: `src/database/schemas/progress_schema.sql`

5. **admin_log_schema.sql**
   - Defines the structure of the `admin_logs` table.
   - Location: `src/database/schemas/admin_log_schema.sql`

6. **session_schema.sql**
   - Defines the structure of the `sessions` table.
   - Location: `src/database/schemas/session_schema.sql`

### Viewing Schema Definitions:

You can review the schema definitions by opening the respective `.sql` files in the `schemas` directory.

## Additional Notes

- **Resetting the Database**:
  - To reset the database, drop and recreate it, then rerun the migrations and seed scripts.
  - Use the following commands:

    ```bash
    dropdb -U your_db_username toddler_puzzle_app
    createdb -U your_db_username toddler_puzzle_app
    ```

- **PostgreSQL Service**:
  - Ensure that your PostgreSQL service is running before executing any commands.
  - Start PostgreSQL service if not running:

    ```bash
    sudo service postgresql start
    ```

## Related Technical Requirements

This setup addresses the following technical requirements from the Technical Specification:

- **TR-1.4**: Implement validation to ensure puzzles are solvable and pieces fit correctly.
- **TR-4.1**: Implement local storage solutions to save downloaded puzzles.
- **TR-5.6**: Ensure all parental control settings are encrypted and securely stored.
- **TR-7.3**: Ensure that all administrative actions are logged for auditing purposes.
- **TR-10.1**: Implement cloud-based storage solutions to save user progress and purchase history.
- **TR-11.6**: Optimize database queries and indexing to enhance data retrieval speeds.

<!--
For more details, refer to the "Technical Requirements" and "System Architecture" sections in the Technical Specification document.
-->