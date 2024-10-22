-- src/database/schemas/puzzle_schema.sql
-- Defines the schema for the 'puzzles' table in the database, specifying the structure and constraints for storing puzzle data.

-- Requirements Addressed:
-- - Puzzle Data Storage
--   - Location: Technical Specification -> SYSTEM DESIGN -> Database Design -> Puzzle Table
--   - Description: Contains details of each puzzle, including image URL, theme, and difficulty level, ensuring data integrity and availability.
-- - Supports Technical Requirements:
--   - TR-1.1: Develop algorithms to generate puzzles with varying piece counts (4, 9, 16).
--     - Location: Technical Specification -> TECHNICAL REQUIREMENTS -> Feature 1: Puzzle Difficulty Levels
--   - TR-2.1: Establish a reliable connection with the DALL-E API for image generation.
--     - Location: Technical Specification -> TECHNICAL REQUIREMENTS -> Feature 2: AI-Generated Images
--   - TR-2.4: Ensure image formats and resolutions are optimized for mobile devices.
--     - Location: Technical Specification -> TECHNICAL REQUIREMENTS -> Feature 2: AI-Generated Images

-- Dependencies:
-- - Internal:
--   - 002_create_puzzles_table.sql (src/database/migrations/002_create_puzzles_table.sql)
--     Ensures the schema matches the table creation script.
--   - progress_schema.sql (src/database/schemas/progress_schema.sql)
--     Ensures the schema supports the progress tracking structure.

-- Create 'puzzles' table if it doesn't exist
CREATE TABLE IF NOT EXISTS puzzles (
    -- puzzle_id: Primary key, unique identifier for each puzzle.
    -- Data Type: SERIAL (Auto-incremented integer)
    -- Constraints: PRIMARY KEY
    -- This column ensures each puzzle can be uniquely identified.
    puzzle_id SERIAL PRIMARY KEY,
    
    -- image_url: Stores the URL of the puzzle image.
    -- Data Type: TEXT
    -- Constraints: NOT NULL
    -- This column is critical as it links to the AI-generated images provided by DALL-E API.
    -- Addresses TR-2.1 and TR-2.4 by ensuring every puzzle has an associated image optimized for mobile devices.
    image_url TEXT NOT NULL,
    
    -- theme: The theme/category of the puzzle (e.g., 'Animals', 'Vehicles').
    -- Data Type: VARCHAR
    -- Constraints: NOT NULL
    -- Helps in categorizing puzzles for thematic selection as per UI requirements.
    -- Enhances user engagement by providing diverse puzzle themes.
    theme VARCHAR NOT NULL,
    
    -- difficulty_level: Indicates the puzzle's difficulty level.
    -- Data Type: INTEGER
    -- Constraints: NOT NULL, CHECK (difficulty_level IN (4, 9, 16))
    -- The CHECK constraint enforces that only valid difficulty levels are allowed, supporting TR-1.1.
    -- Ensures the system can generate puzzles with the specified number of pieces.
    difficulty_level INTEGER NOT NULL CHECK (difficulty_level IN (4, 9, 16))
);

-- Additional Notes:
-- - Indexes can be added on 'theme' and 'difficulty_level' columns to improve query performance for puzzle selection.
-- - Ensure consistency with 'progress_schema.sql' for accurate tracking of puzzle completion by users.
-- - Future enhancements might include additional columns like 'approved' (BOOLEAN) for admin controls per TR-7.

-- End of 'puzzles' table schema definition.