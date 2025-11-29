import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Mock database functions for when PostgreSQL is not available
const mockDB = {
  query: (text, params) => {
    console.warn('Database not connected. Returning mock response for query:', text);
    return Promise.resolve({ rows: [], rowCount: 0 });
  }
};

let db;

try {
  // PostgreSQL connection pool
  const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'eventra',
    password: process.env.DB_PASSWORD || 'postgres',
    port: process.env.DB_PORT || 5432,
  });

  // Test the database connection
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Database connection error:', err.stack);
      console.log('Using mock database for development');
      db = mockDB;
    } else {
      console.log('Database connected successfully!');
      db = {
        query: (text, params) => pool.query(text, params),
      };
    }
  });

  // Set db to pool initially (will be overwritten if connection fails)
  db = {
    query: (text, params) => pool.query(text, params),
  };
} catch (error) {
  console.error('Failed to initialize database connection:', error);
  console.log('Using mock database for development');
  db = mockDB;
}

export default db;