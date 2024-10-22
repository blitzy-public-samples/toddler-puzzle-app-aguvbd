-- Migration Script to Create the 'users' Table
-- Requirements Addressed:
--   - User Data Storage
--     Location: Technical Specification/Database Design/User Table
--     Description: Stores information about parents and admin users, including username, password, email, and role.
-- Dependencies:
--   - Internal:
--     - user_schema.sql (src/database/schemas/user_schema.sql)
--       Purpose: Defines the schema for the 'users' table, ensuring consistency with this migration script.

-- Drop the 'users' table if it already exists to ensure a clean migration.
DROP TABLE IF EXISTS users;

-- Create the 'users' table.
CREATE TABLE users (
    -- user_id: Unique identifier for each user.
    --   - Type: SERIAL (auto-incrementing integer)
    --   - Constraints: PRIMARY KEY
    user_id SERIAL PRIMARY KEY,

    -- username: Unique username for the user.
    --   - Type: VARCHAR
    --   - Constraints: NOT NULL, UNIQUE
    username VARCHAR NOT NULL UNIQUE,

    -- password: Hashed password for user authentication.
    --   - Type: VARCHAR
    --   - Constraints: NOT NULL
    password VARCHAR NOT NULL,

    -- email: User's email address.
    --   - Type: VARCHAR
    --   - Constraints: NOT NULL, UNIQUE
    email VARCHAR NOT NULL UNIQUE,

    -- role: Role of the user in the system ('parent' or 'admin').
    --   - Type: VARCHAR
    --   - Constraints: NOT NULL
    role VARCHAR NOT NULL
);

-- Ensure consistency with the user schema defined in 'user_schema.sql'.
-- For more details, refer to 'src/database/schemas/user_schema.sql'.

-- Indexes can be added below if necessary to improve query performance on specific columns.

-- End of migration script for creating the 'users' table.