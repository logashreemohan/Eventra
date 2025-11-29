// Script to initialize the database with required tables
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../config/db.js';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the schema file
const schemaPath = path.join(__dirname, '..', 'config', 'schema.sql');
const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

// Initialize the database
const initDB = async () => {
  try {
    console.log('Initializing database...');
    
    // Execute the schema SQL
    await db.query(schemaSQL);
    
    console.log('Database initialized successfully!');
    
    // Insert some sample data for testing
    console.log('Inserting sample data...');
    
    // Insert sample users
    await db.query(`
      INSERT INTO users (name, email, password, role, phone, location) VALUES
      ('Admin User', 'admin@eventra.com', '$2a$10$8K1p/a0dhrxiowP.dnkgNORTWgdEDHn5L2/xjpEWuC.QQv4rKO9jO', 'admin', '9876543210', 'Mumbai'),
      ('John Client', 'john.client@example.com', '$2a$10$8K1p/a0dhrxiowP.dnkgNORTWgdEDHn5L2/xjpEWuC.QQv4rKO9jO', 'client', '9876543211', 'Delhi'),
      ('Jane Vendor', 'jane.vendor@example.com', '$2a$10$8K1p/a0dhrxiowP.dnkgNORTWgdEDHn5L2/xjpEWuC.QQv4rKO9jO', 'vendor', '9876543212', 'Bangalore')
      ON CONFLICT (email) DO NOTHING;
    `);
    
    // Insert sample vendors
    await db.query(`
      INSERT INTO vendors (user_id, business_name, category, description, experience, price_range, website, instagram, facebook, approval_status) VALUES
      (3, 'Jane''s Photography', 'Photography', 'Professional wedding photography services with over 10 years of experience capturing beautiful moments.', 10, '$$', 'https://janesphotography.com', 'janes_photography', 'janes.photography', 'approved'),
      (3, 'Jane''s Catering', 'Catering', 'Delicious catering services for weddings and special events.', 8, '$$$', 'https://janescatering.com', 'janes_catering', 'janes.catering', 'approved')
      ON CONFLICT DO NOTHING;
    `);
    
    console.log('Sample data inserted successfully!');
    console.log('Database setup complete.');
    
    // Close the database connection
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

// Run the initialization
initDB();