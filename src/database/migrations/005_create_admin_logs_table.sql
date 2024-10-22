-- 005_create_admin_logs_table.sql
-- Migration script to create the 'admin_logs' table.
-- Requirements Addressed:
-- - Admin Log Data Storage
--   Location: Technical Specification/Database Design/Admin_Log Table
--   Description: Logs all administrative actions, including admin ID, action performed, and timestamp, to ensure accountability and facilitate auditing.

-- Dependency:
-- - Depends on the 'users' table for foreign key relationship.
--   Internal Module: src/database/migrations/001_create_users_table.sql

CREATE TABLE IF NOT EXISTS admin_logs (
    -- Unique identifier for each log entry.
    log_id SERIAL PRIMARY KEY,

    -- Identifier of the admin user who performed the action.
    -- Foreign key referencing users(user_id) to associate logs with admin users.
    admin_id INTEGER NOT NULL REFERENCES users(user_id),

    -- Description of the administrative action performed.
    action TEXT NOT NULL,

    -- Timestamp when the action was performed.
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes to enhance query performance for auditing purposes.
CREATE INDEX idx_admin_logs_admin_id ON admin_logs(admin_id);
CREATE INDEX idx_admin_logs_timestamp ON admin_logs(timestamp);

-- Comments for better schema understanding.
COMMENT ON TABLE admin_logs IS 'Stores logs of all administrative actions for auditing purposes.';
COMMENT ON COLUMN admin_logs.log_id IS 'Unique identifier for each log entry.';
COMMENT ON COLUMN admin_logs.admin_id IS 'Foreign key to users(user_id), identifying the admin user.';
COMMENT ON COLUMN admin_logs.action IS 'Description of the action performed by the admin.';
COMMENT ON COLUMN admin_logs.timestamp IS 'Timestamp of when the action was performed.';