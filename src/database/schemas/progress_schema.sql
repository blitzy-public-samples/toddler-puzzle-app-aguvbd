-- File: src/database/schemas/progress_schema.sql
-- Description: Defines the schema for the 'progress' table, ensuring consistency with the database design and related SQL scripts.
-- Requirements Addressed:
--   - Progress Data Storage
--     - Location: Technical Specification/Database Design/Progress Table
--     - Description: Tracks users' puzzle completion status and history, including user ID, puzzle ID, and completion date.
-- Dependencies:
--   - Internal:
--     - src/database/migrations/004_create_progress_table.sql
--       - Purpose: Ensures the schema matches the table creation script.
--     - src/database/schemas/user_schema.sql
--       - Purpose: Defines the schema for the 'users' table, which is referenced by the progress table.
--     - src/database/schemas/puzzle_schema.sql
--       - Purpose: Defines the schema for the 'puzzles' table, which is referenced by the progress table.
--     - src/backend/src/models/ProgressModel.ts
--       - Purpose: Ensures the schema aligns with the ORM model.

-- Create the 'progress' table to track users' puzzle completion status and history
CREATE TABLE IF NOT EXISTS progress (
    -- 'progress_id' is a unique identifier for each progress entry
    -- Type: SERIAL PRIMARY KEY
    progress_id SERIAL PRIMARY KEY,

    -- 'user_id' references the user who completed the puzzle
    -- Type: INTEGER
    -- Constraint: FOREIGN KEY referencing 'users(user_id)'
    user_id INTEGER NOT NULL,
    CONSTRAINT fk_progress_user
        FOREIGN KEY(user_id)
            REFERENCES users(user_id)
            ON UPDATE CASCADE
            ON DELETE CASCADE,

    -- 'puzzle_id' references the completed puzzle
    -- Type: INTEGER
    -- Constraint: FOREIGN KEY referencing 'puzzles(puzzle_id)'
    puzzle_id INTEGER NOT NULL,
    CONSTRAINT fk_progress_puzzle
        FOREIGN KEY(puzzle_id)
            REFERENCES puzzles(puzzle_id)
            ON UPDATE CASCADE
            ON DELETE CASCADE,

    -- 'completion_date' records when the puzzle was completed
    -- Type: TIMESTAMP
    -- Constraint: NOT NULL, defaults to current timestamp
    completion_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes to optimize queries on 'user_id' and 'puzzle_id'
-- Improves performance for lookup operations involving these columns
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_puzzle_id ON progress(puzzle_id);

-- Ensure the schema matches the table creation script in '004_create_progress_table.sql'
-- This alignment is critical for consistency across migrations and schema definitions

-- Reference to 'ProgressModel.ts' in the backend
-- Ensures that the ORM model reflects the same structure as the database schema
-- Location: src/backend/src/models/ProgressModel.ts

-- The 'progress' table supports features like:
--   - Tracking individual user progress over time
--   - Providing data for activity monitoring and parental control features
--   - Enabling analytics on puzzle completion rates and user engagement

-- Note: Adjust ON UPDATE and ON DELETE actions as per the application's integrity requirements