-- src/database/seeds/seed_users.sql
-- Description: SQL script to seed the 'users' table with initial data.
-- Provides default users for testing and development purposes.

-- Requirements Addressed:
-- - User Data Initialization
--   - Location: Technical Specification/Database Design/User Table
--   - Description: Provides initial data for the 'users' table to facilitate testing and development.

-- Dependencies:
-- - Internal:
--   - 'users' table creation script
--     - Module: src/database/migrations/001_create_users_table.sql
--     - Purpose: Ensures the 'users' table exists with the correct schema before seeding data.
--   - 'user_schema.sql'
--     - Module: src/database/schemas/user_schema.sql
--     - Purpose: Defines the schema for the 'users' table, ensuring consistency with the seed data.

BEGIN;

-- Ensure the 'users' table exists
-- This checks if the 'users' table exists before attempting to insert data.
-- It addresses potential issues where the table might not be created yet.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'users'
    ) THEN
        RAISE EXCEPTION '''users'' table does not exist. Run the migration script src/database/migrations/001_create_users_table.sql first.';
    END IF;
END
$$;

-- Insert initial data into 'users' table
-- The following inserts seed data into the 'users' table as per the requirements.
-- Addresses TR-1.4: Implement validation to ensure puzzles are solvable and pieces fit correctly.
INSERT INTO users (username, password, email, role)
VALUES
    -- Administrator account
    ('admin', crypt('AdminPassword123!', gen_salt('bf')),
     'admin@example.com', 'admin'),
    -- Parent account
    ('parent1', crypt('ParentPassword123!', gen_salt('bf')),
     'parent1@example.com', 'parent');

-- Note:
-- - Passwords are hashed using bcrypt for security as per best practices.
-- - This ensures compliance with the 'Data Security' section in the Technical Specification.

-- Verify that data was inserted correctly
-- This selects the inserted data for verification purposes.
SELECT user_id, username, email, role
FROM users
WHERE username IN ('admin', 'parent1');

COMMIT;