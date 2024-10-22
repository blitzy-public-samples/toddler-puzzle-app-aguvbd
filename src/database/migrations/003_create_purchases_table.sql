-- Migration Script: 003_create_purchases_table.sql

/*
 * SQL migration script to create the 'purchases' table in the database.
 * This table records all purchase transactions made by users, including user ID, purchase date, and amount.
 *
 * Requirements Addressed:
 * - Purchase Data Storage (Technical Specification/Database Design/Purchase Table)
 *   - Records all purchase transactions made by users, including user ID, purchase date, and amount.
 *
 * Dependencies:
 * - Depends on the 'users' table created in '001_create_users_table.sql' to establish a foreign key relationship with 'user_id'.
 */

-- Create the 'purchases' table
CREATE TABLE purchases (
    -- 'purchase_id': Unique identifier for each purchase transaction.
    -- Type: SERIAL (automatically increments)
    purchase_id SERIAL PRIMARY KEY,
    
    -- 'user_id': References the user who made the purchase.
    -- Type: INTEGER
    -- Constraint: NOT NULL, FOREIGN KEY references 'users(user_id)'
    -- Requirement Addressed: Associates purchases with users (Technical Specification/Database Design/Purchase Table)
    user_id INTEGER NOT NULL,
    
    -- 'purchase_date': The date and time when the purchase was made.
    -- Type: TIMESTAMP
    -- Constraint: NOT NULL, default value is CURRENT_TIMESTAMP
    -- Requirement Addressed: Records the date and time of purchase (Technical Specification/Database Design/Purchase Table)
    purchase_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- 'amount': The monetary amount of the purchase.
    -- Type: DECIMAL
    -- Constraint: NOT NULL
    -- Requirement Addressed: Records the amount of the purchase transaction (Technical Specification/Database Design/Purchase Table)
    amount DECIMAL NOT NULL,
    
    -- Define foreign key constraint on 'user_id' to reference 'users(user_id)'
    CONSTRAINT fk_purchases_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE  -- Ensures that purchases are deleted if the associated user is deleted.
);

/*
 * Notes:
 * - The 'purchases' table captures all purchase transactions, linking them to users via 'user_id'.
 * - The 'ON DELETE CASCADE' clause maintains referential integrity by cascading deletions from 'users' to 'purchases'.
 * - This migration addresses the requirement to store purchase transactions as per the Technical Specification.
 */