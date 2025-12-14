import sqlite3, { Database } from 'sqlite3';
import path from 'path';
import * as fs from 'fs';

// Get the absolute path to the database
// When running with ts-node-dev, we need to go from src/ to root
const DB_PATH = process.env.DB_PATH 
  ? path.resolve(process.cwd(), process.env.DB_PATH)
  : path.resolve(process.cwd(), '../backend/gold.db');

console.log('🔍 Database path:', DB_PATH);
console.log('📁 Current directory:', process.cwd());

let db: Database | null = null;

export const getConnection = (): Database => {
  if (db) {
    return db;
  }

  // Check if database file exists
  if (!fs.existsSync(DB_PATH)) {
    console.error(`❌ Database file not found at: ${DB_PATH}`);
    throw new Error(`Database file not found at: ${DB_PATH}`);
  }

  console.log(`📂 Connecting to database at: ${DB_PATH}`);

  db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error('❌ DATABASE CONNECTION ERROR:', err.message);
      throw err;
    }
    console.log('✅ Connected to SQLite database');
  });

  return db;
};

export const executeQuery = <T = any>(
  queryFile: string,
  params: any[] = []
): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    const connection = getConnection();
    const sqlPath = path.resolve(process.cwd(), 'sql', queryFile);
    
    // Check if SQL file exists
    if (!fs.existsSync(sqlPath)) {
      console.error(`❌ SQL file not found at: ${sqlPath}`);
      reject(new Error(`SQL file not found: ${queryFile}`));
      return;
    }
    
    // Read SQL file
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    connection.all(sql, params, (err, rows) => {
      if (err) {
        console.error('Query Error:', err);
        reject(err);
      } else {
        resolve(rows as T[]);
      }
    });
  });
};

export const executeQueryDirect = <T = any>(
  sql: string,
  params: any[] = []
): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    const connection = getConnection();

    connection.all(sql, params, (err, rows) => {
      if (err) {
        console.error('Query Error:', err);
        reject(err);
      } else {
        resolve(rows as T[]);
      }
    });
  });
};

export const closeConnection = (): void => {
  if (db) {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      } else {
        console.log('Database connection closed');
      }
    });
    db = null;
  }
};
