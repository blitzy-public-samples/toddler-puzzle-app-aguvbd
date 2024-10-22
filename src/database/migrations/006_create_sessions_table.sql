-- Migration Script to Create 'sessions' Table
--
-- Description:
-- This script creates the 'sessions' table in the database, which manages user session data for authentication and activity tracking.
--
-- Requirements Addressed:
-- - Session Data Storage
--   Location: Technical Specification/Database Design/Session Table
--   Description: Stores session information, including session ID, user ID, creation timestamp, and expiration timestamp, to manage user sessions securely.
--
-- Dependencies:
-- - Depends on 'users' table (src/database/migrations/001_create_users_table.sql)
--   Purpose: Establishes a foreign key relationship with the 'sessions' table to associate sessions with users.

-- Drop the 'sessions' table if it already exists to ensure a clean migration.
DROP TABLE IF EXISTS sessions;

-- Create the 'sessions' table to store user session data.
CREATE TABLE sessions (
    -- 'session_id' is the primary key for the 'sessions' table.
    session_id SERIAL PRIMARY KEY,

    -- 'user_id' references the 'user_id' in the 'users' table to associate sessions with users.
    -- This addresses the requirement to securely manage user sessions by linking each session to a user.
    -- Requirement Location: Technical Specification/Database Design/Session Table
    user_id INTEGER NOT NULL,

    -- 'created_at' stores the timestamp when the session was created.
    -- It defaults to the current timestamp and cannot be null.
    -- This helps in tracking session start times.
    -- Requirement Location: Technical Specification/Database Design/Session Table
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- 'expires_at' stores the timestamp when the session will expire.
    -- This is crucial for session management and security.
    -- Requirement Location: Technical Specification/Database Design/Session Table
    expires_at TIMESTAMP NOT NULL
);

-- Add a foreign key constraint to 'user_id' to enforce referential integrity.
-- This ensures that each session is associated with a valid user in the 'users' table.
-- Dependency: Establishes relationship with 'users' table.
ALTER TABLE sessions
ADD CONSTRAINT fk_sessions_user
FOREIGN KEY (user_id)
REFERENCES users(user_id)
ON DELETE CASCADE;

-- Create an index on 'user_id' to improve query performance when filtering by user.
CREATE INDEX idx_sessions_user_id ON sessions(user_id);

-- Additional Notes:
-- - ON DELETE CASCADE ensures that if a user is deleted, all their sessions are also deleted.
-- - Regularly scheduled jobs should be implemented to remove expired sessions to maintain database performance.
-- - Consider adding IP address and user agent information for enhanced security and session management in future iterations.