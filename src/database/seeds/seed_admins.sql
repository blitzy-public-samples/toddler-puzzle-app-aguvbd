-- src/database/seeds/seed_admins.sql
-- Description: SQL script to seed the 'admin_logs' table with initial data, providing default logs for testing and development purposes.

-- Requirements Addressed:
-- - Admin Log Data Initialization
--   Location: Technical Specification/Database Design/Admin_Log Table
--   Description: Provides initial data for the 'admin_logs' table to facilitate testing and development.

-- Dependencies:
-- - Ensures the 'admin_logs' table exists with the correct schema before seeding data.
--   Reference: src/database/migrations/005_create_admin_logs_table.sql
-- - Defines the schema for the 'admin_logs' table, ensuring consistency with the seed data.
--   Reference: src/database/schemas/admin_log_schema.sql

-- Ensure that the 'admin_logs' table exists before inserting seed data.
-- This check is crucial for preventing errors during the seeding process.
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'admin_logs') THEN
        RAISE EXCEPTION 'Table admin_logs does not exist. Please run the migrations first.';
    END IF;
END
$$;

-- Insert initial data into 'admin_logs' table.
-- This seed data provides a default log entry for testing and development purposes.
INSERT INTO admin_logs (admin_id, action, timestamp) VALUES
    -- Seed data as specified in the requirements.
    (1, 'Initial admin log entry for testing.', CURRENT_TIMESTAMP);

-- Note:
-- - 'admin_id' references an existing user in the 'users' table (foreign key constraint).
--   Ensure that a user with 'user_id' = 1 exists prior to running this seed script.
-- - 'action' contains a description of the administrative action.
-- - 'timestamp' records the time of the log entry, defaulting to the current timestamp.

-- This script addresses the need for initial admin log data as outlined in the technical specification.
-- It ensures that developers have default data to work with during testing phases.