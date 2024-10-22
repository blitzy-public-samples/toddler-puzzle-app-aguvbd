-- Seed script to populate the 'puzzles' table with initial data.
-- Requirements Addressed:
--   - Initial Puzzle Data Population
--     Location: Technical Specification/Database Design/Puzzle Table
--     Description: Populates the puzzles table with initial data to ensure that the app has a set of predefined puzzles available upon deployment.

-- Dependencies:
--   - 'src/database/migrations/002_create_puzzles_table.sql':
--       Defines the schema for the 'puzzles' table.
--   - 'src/database/schemas/puzzle_schema.sql':
--       Provides the structure and constraints for the 'puzzles' table.
--   - 'db_config.json':
--       Contains database configuration settings necessary for executing the seed script.

-- Begin transaction to ensure data integrity.
BEGIN;

-- Insert initial puzzle data into the 'puzzles' table.
-- Each puzzle includes an image URL, theme, and difficulty level.
-- Ensure that 'difficulty_level' values comply with the constraints specified in:
--   - Technical Specification/TR-1.1 and TR-1.4
--     Allowed values: 4 (Starter), 9 (Advanced), 16 (Genius)
INSERT INTO puzzles (image_url, theme, difficulty_level) VALUES
    -- Puzzle 1: Starter Level
    ('https://example.com/images/animals1.png', 'Animals', 4),
    -- Puzzle 2: Starter Level
    ('https://example.com/images/vehicles1.png', 'Vehicles', 4),
    -- Puzzle 3: Advanced Level
    ('https://example.com/images/nature1.png', 'Nature', 9),
    -- Puzzle 4: Advanced Level
    ('https://example.com/images/fantasy1.png', 'Fantasy', 9),
    -- Puzzle 5: Genius Level
    ('https://example.com/images/everyday1.png', 'Everyday Life', 16),
    -- Puzzle 6: Genius Level
    ('https://example.com/images/animals2.png', 'Animals', 16),
    -- Puzzle 7: Starter Level
    ('https://example.com/images/vehicles2.png', 'Vehicles', 4),
    -- Puzzle 8: Advanced Level
    ('https://example.com/images/nature2.png', 'Nature', 9),
    -- Puzzle 9: Genius Level
    ('https://example.com/images/fantasy2.png', 'Fantasy', 16),
    -- Puzzle 10: Starter Level
    ('https://example.com/images/everyday2.png', 'Everyday Life', 4);

-- Commit the transaction after successful insertion.
COMMIT;

-- Notes:
--   - Ensure that all image URLs are valid and images are appropriate for toddlers.
--   - All content must comply with content moderation policies as per:
--       - Technical Specification/Feature 2: AI-Generated Images
--       - Technical Specification/Feature 7: Admin Controls
--   - The themes should be engaging and suitable for the target age group (2-5 years).