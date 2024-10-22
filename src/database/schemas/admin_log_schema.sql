-- src/database/schemas/admin_log_schema.sql

-- Description:
-- Defines the schema for the 'admin_logs' table, ensuring consistency with the database design and related SQL scripts.

-- Requirements Addressed:
-- - TR-7.3: Ensure that all administrative actions are logged for auditing purposes.
--   Location: Technical Specification -> Feature 7: Admin Controls -> TR-7.3
--   Description: Logs all administrative actions, including admin ID, action performed, and timestamp, to ensure accountability and facilitate auditing.

-- Dependencies:
-- - 'users' table from 'src/database/migrations/001_create_users_table.sql' and 'src/database/schemas/user_schema.sql'
--   Purpose: Establishes a foreign key relationship to associate logs with admin users.
-- - Creation script in 'src/database/migrations/005_create_admin_logs_table.sql'
--   Purpose: Ensures the schema matches the table creation script.

-- Start of 'admin_logs' table schema definition

CREATE TABLE admin_logs (
    -- log_id: Unique identifier for each log entry.
    -- Data Type: SERIAL
    -- Constraints: PRIMARY KEY
    log_id SERIAL PRIMARY KEY,

    -- admin_id: References the admin user who performed the action.
    -- Data Type: INTEGER
    -- Constraints: NOT NULL, FOREIGN KEY REFERENCES users(user_id)
    -- Dependency: Relies on 'users' table to establish relationship.
    admin_id INTEGER NOT NULL REFERENCES users(user_id),

    -- action: Description of the action performed by the admin.
    -- Data Type: TEXT
    -- Constraints: NOT NULL
    -- Purpose: Captures details of the administrative action for auditing.
    action TEXT NOT NULL,

    -- timestamp: The date and time when the action was performed.
    -- Data Type: TIMESTAMP
    -- Constraints: NOT NULL, DEFAULT CURRENT_TIMESTAMP
    -- Purpose: Records when the action took place for accountability.
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- End of 'admin_logs' table schema definition