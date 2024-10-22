-- Migration Script: Create the 'puzzles' table in the database
-- Description: Stores details of each puzzle, including image URL, theme, and difficulty level.
-- Requirements Addressed:
-- - "Puzzle Data Storage" (Technical Specification/Database Design/Puzzle Table):
--   Defines the schema for storing details of each puzzle, ensuring data integrity and availability.
-- Dependencies:
-- - Depends on 'puzzle_schema.sql' (src/database/schemas/puzzle_schema.sql):
--   Defines the schema for the 'puzzles' table, ensuring consistency with the migration script.

-- Create the 'puzzles' table
CREATE TABLE puzzles (
    -- 'puzzle_id' is a unique identifier for each puzzle.
    -- Data Type: SERIAL (auto-incrementing integer)
    -- Constraints: PRIMARY KEY
    -- Requirements Addressed:
    -- - TR-1.1 (Feature 1: Puzzle Difficulty Levels)
    --   - Ensures each puzzle has a unique identifier.
    puzzle_id SERIAL PRIMARY KEY,

    -- 'image_url' stores the URL of the puzzle image.
    -- Data Type: TEXT
    -- Constraints: NOT NULL
    -- Requirements Addressed:
    -- - TR-2.4 (Feature 2: AI-Generated Images)
    --   - Ensures image formats and resolutions are optimized for mobile devices.
    --   - Stores URLs of AI-generated images.
    image_url TEXT NOT NULL,

    -- 'theme' represents the category or theme of the puzzle.
    -- Data Type: VARCHAR
    -- Constraints: NOT NULL
    -- Requirements Addressed:
    -- - TR-2.2 (Feature 2: AI-Generated Images)
    --   - Categorizes puzzles for dynamic content generation.
    -- - Enhances user experience by organizing puzzles into themes.
    theme VARCHAR NOT NULL,

    -- 'difficulty_level' indicates the difficulty of the puzzle based on piece count.
    -- Data Type: INTEGER
    -- Constraints: NOT NULL, CHECK constraint to allow only 4, 9, or 16.
    -- Requirements Addressed:
    -- - TR-1.1 (Feature 1: Puzzle Difficulty Levels)
    --   - Supports puzzles with 4, 9, and 16 pieces for different developmental stages.
    -- - TR-1.4
    --   - Ensures data integrity by restricting values to defined difficulty levels.
    difficulty_level INTEGER NOT NULL CHECK (difficulty_level IN (4, 9, 16))
);