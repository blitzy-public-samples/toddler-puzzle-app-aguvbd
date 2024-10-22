-- File: src/database/schemas/user_schema.sql
-- Description: Defines the schema for the 'users' table, ensuring consistency with the database design and related SQL scripts.
-- Requirements Addressed:
--   - User Data Storage (Technical Specification/Database Design/User Table)
--     Stores information about parents and admin users, including username, password, email, and role.

-- Dependencies:
--   - src/database/migrations/001_create_users_table.sql
--     Ensures the schema matches the table creation script.
--   - src/database/seeds/seed_users.sql
--     Ensures the schema supports the seed data structure.
--   - src/backend/src/models/UserModel.ts
--     Ensures the schema aligns with the ORM model.

-- Begin 'users' table schema definition
CREATE TABLE IF NOT EXISTS users (
    -- user_id: Unique identifier for each user
    -- Requirement Addressed:
    --   - Provides a primary key for the 'users' table.
    --   - Location: Technical Specification/Database Design/User Table
    user_id SERIAL PRIMARY KEY,

    -- username: Unique username for user authentication
    -- Requirement Addressed:
    --   - Stores the user's username for login purposes.
    --   - Enforces uniqueness and non-null constraints.
    --   - Location: Technical Specification/Database Design/User Table
    username VARCHAR NOT NULL UNIQUE,

    -- password: Hashed password for secure authentication
    -- Requirement Addressed:
    --   - Stores the user's password securely.
    --   - Ensures password field is not null.
    --   - Location: Technical Specification/Database Design/User Table
    password VARCHAR NOT NULL,

    -- email: Unique email address for communication
    -- Requirement Addressed:
    --   - Stores the user's email for account recovery and notifications.
    --   - Enforces uniqueness and non-null constraints.
    --   - Location: Technical Specification/Database Design/User Table
    email VARCHAR NOT NULL UNIQUE,

    -- role: Defines user access level ('parent' or 'admin')
    -- Requirement Addressed:
    --   - Determines the user's permissions within the app.
    --   - Ensures role field is not null.
    --   - Location: Technical Specification/Database Design/User Table
    role VARCHAR NOT NULL
);
-- End of 'users' table schema definition