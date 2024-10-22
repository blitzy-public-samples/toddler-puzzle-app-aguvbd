-- Migration Script: 004_create_progress_table.sql

-- Description:
-- This script creates the 'progress' table in the database, which tracks users' puzzle completion status and history.

-- Requirements Addressed:
-- - Progress Data Storage
--   - Location: Technical Specification/Database Design/Progress Table
--   - Description: Tracks users' puzzle completion status and history, including user ID, puzzle ID, and completion date.

-- Dependencies:
-- - Internal:
--   - 'users' table (Defined in 'src/database/migrations/001_create_users_table.sql')
--     - Purpose: Defines the 'users' table, which is referenced by the 'progress' table.
--   - 'puzzles' table (Defined in 'src/database/migrations/002_create_puzzles_table.sql')
--     - Purpose: Defines the 'puzzles' table, which is referenced by the 'progress' table.
--   - 'progress_schema.sql' (Defined in 'src/database/schemas/progress_schema.sql')
--     - Purpose: Defines the schema for the 'progress' table, ensuring consistency with the migration script.

-- Ensure that the 'users' and 'puzzles' tables are created before running this migration.

-- Create the 'progress' table
CREATE TABLE IF NOT EXISTS progress (
    -- 'progress_id' column: Unique identifier for each progress record
    progress_id SERIAL PRIMARY KEY,
    
    -- 'user_id' column: Foreign key referencing 'users(user_id)'
    user_id INTEGER NOT NULL,
    
    -- 'puzzle_id' column: Foreign key referencing 'puzzles(puzzle_id)'
    puzzle_id INTEGER NOT NULL,
    
    -- 'completion_date' column: Timestamp of when the puzzle was completed
    completion_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Key Constraints to maintain referential integrity
    CONSTRAINT fk_progress_user
        FOREIGN KEY (user_id)
            REFERENCES users(user_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_progress_puzzle
        FOREIGN KEY (puzzle_id)
            REFERENCES puzzles(puzzle_id)
            ON DELETE CASCADE
);

-- Indexes to improve query performance when filtering by 'user_id' and 'puzzle_id'
CREATE INDEX idx_progress_user_id ON progress(user_id);
CREATE INDEX idx_progress_puzzle_id ON progress(puzzle_id);

-- Additional Notes:
-- - The 'ON DELETE CASCADE' actions ensure that when a user or puzzle is deleted,
--   the related progress records are also deleted.
-- - Indexes are added on 'user_id' and 'puzzle_id' to optimize queries filtering by these columns.
-- - This aligns with Technical Requirement TR-4.5 in the Technical Specification under
--   "Feature 4: Offline Playability", ensuring all core functionalities are accessible offline,
--   including puzzle completion and progress tracking.