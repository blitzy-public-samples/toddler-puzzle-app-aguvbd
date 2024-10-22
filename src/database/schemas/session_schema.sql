-- Description:
-- Defines the schema for the 'sessions' table, which manages user session data,
-- including session ID, user ID, and timestamps for session creation and expiration.

-- Requirements Addressed:
-- - Session Data Storage
--   Location: Technical Specification -> TECHNICAL REQUIREMENTS -> Feature 10: Data Synchronization -> TR-10.1
--   "Implement cloud-based storage solutions to save user progress and purchase history."
--   This table contributes to storing session information essential for data synchronization across devices.

-- Dependencies:

-- Internal Dependencies:
-- - user_schema.sql (src/database/schemas/user_schema.sql)
--   Purpose: Ensures the schema aligns with the user table schema for foreign key constraints.

-- - 006_create_sessions_table.sql (src/database/migrations/006_create_sessions_table.sql)
--   Purpose: Ensures the schema matches the table creation script.

-- - db_config.json (src/database/db_config.json)
--   Purpose: Provides configuration settings for database connections.

-- External Dependencies:
-- - None

-- Table: sessions
-- Purpose: Stores active session data for users to facilitate authentication and maintain session persistence.

CREATE TABLE IF NOT EXISTS sessions (
    -- session_id: Unique identifier for each session.
    -- Data Type: SERIAL
    -- Constraints: PRIMARY KEY
    session_id SERIAL PRIMARY KEY,

    -- user_id: References the user associated with the session.
    -- Data Type: INTEGER
    -- Constraints: NOT NULL, FOREIGN KEY REFERENCES users(user_id)
    -- Requirements Addressed:
    -- - Data Integrity and Referential Integrity
    --   Ensures every session is linked to a valid user.
    --   Location: Technical Specification -> SYSTEM COMPONENTS -> Database Design -> Entity-Relationship Diagram.
    user_id INTEGER NOT NULL REFERENCES users(user_id),

    -- created_at: Timestamp indicating when the session was created.
    -- Data Type: TIMESTAMP
    -- Constraints: NOT NULL, DEFAULT CURRENT_TIMESTAMP
    -- Requirements Addressed:
    -- - Session Tracking
    --   Allows tracking of session initiation times.
    --   Location: Technical Specification -> TECHNICAL REQUIREMENTS -> Feature 5: Parental Controls -> TR-5.4
    --   "Develop activity monitoring dashboards that provide insights into the child’s usage patterns."
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- expires_at: Timestamp indicating when the session expires.
    -- Data Type: TIMESTAMP
    -- Constraints: NOT NULL
    -- Requirements Addressed:
    -- - Session Expiration Management
    --   Facilitates session timeout mechanisms to enhance security.
    --   Location: Technical Specification -> SECURITY CONSIDERATIONS -> Authentication and Authorization.
    expires_at TIMESTAMP NOT NULL
);

-- Indexes:

-- Index on user_id to improve query performance for session retrieval by user.
-- Requirements Addressed:
-- - Performance Optimization
--   Location: Technical Specification -> TECHNICAL REQUIREMENTS -> Feature 11: Performance Optimization -> TR-11.6
--   "Optimize database queries and indexing to enhance data retrieval speeds."
CREATE INDEX idx_sessions_user_id ON sessions(user_id);

-- Additional Constraints:

-- Ensure that expires_at is greater than created_at to maintain logical data consistency.
-- Requirements Addressed:
-- - Data Validation
--   Location: Technical Specification -> TECHNOLOGY STACK -> Database Design -> Data Storage Considerations.
ALTER TABLE sessions
ADD CONSTRAINT chk_session_times CHECK (expires_at > created_at);

-- End of schema definition for 'sessions' table.