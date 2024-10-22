-- *****************************************************************************
-- File: src/database/schemas/purchase_schema.sql
-- Description: Defines the schema for the 'purchases' table, which records all
-- purchase transactions made by users, including user ID, purchase date, and amount.
-- This addresses the requirement 'Purchase Data Storage' located at:
-- 'Technical Specification/Database Design/Purchase Table'.
-- *****************************************************************************

-- Dependency:
-- The 'purchases' table depends on the 'users' table defined in
-- 'src/database/migrations/001_create_users_table.sql'.
-- Purpose: Establishes a foreign key relationship to associate purchases with users.

-- *****************************************************************************
-- Create the 'purchases' table.
CREATE TABLE purchases (
    -- 'purchase_id' is the PRIMARY KEY and uniquely identifies each purchase transaction.
    -- Data Type: SERIAL (automatically generates a sequential integer).
    purchase_id SERIAL PRIMARY KEY,

    -- 'user_id' references the user who made the purchase.
    -- Data Type: INTEGER.
    -- Constraint: FOREIGN KEY referencing 'users(user_id)' to ensure referential integrity.
    user_id INTEGER NOT NULL,
    
    -- 'purchase_date' records the date and time of the purchase.
    -- Data Type: TIMESTAMP.
    -- Constraints: NOT NULL, with a default value of CURRENT_TIMESTAMP to automatically
    -- record the timestamp when a new record is inserted.
    purchase_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- 'amount' records the monetary value of the purchase.
    -- Data Type: DECIMAL.
    -- Constraint: NOT NULL to ensure every transaction has an associated amount.
    amount DECIMAL NOT NULL,

    -- Define the FOREIGN KEY constraint for 'user_id' referencing the 'users' table.
    CONSTRAINT fk_purchases_user_id
        FOREIGN KEY (user_id)
            REFERENCES users(user_id)
            ON DELETE CASCADE
);

-- Index Creation:
-- Create an index on 'user_id' to optimize queries filtering by user.
CREATE INDEX idx_purchases_user_id ON purchases(user_id);

-- *****************************************************************************
-- Additional Notes:
-- - This schema ensures all purchase transactions are properly linked to existing users.
-- - It supports functionalities described in 'Feature 3: One-Time Payment Model',
--   specifically handling secure and reliable recording of purchase transactions.
-- - Complies with 'TR-3.2' and 'TR-3.5' from the Technical Requirements by securely
--   storing transaction details and ensuring data integrity.
-- *****************************************************************************