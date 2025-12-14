import { Pool, QueryResult } from 'pg';
import path from 'path';
import * as fs from 'fs';

// PostgreSQL connection configuration
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test connection on startup
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected PostgreSQL error:', err);
});

export const getConnection = () => {
  return pool;
};

export const executeQuery = <T = any>(
  queryFile: string,
  params: any[] = []
): Promise<T[]> => {
  return new Promise(async (resolve, reject) => {
    const sqlPath = path.resolve(process.cwd(), 'sql', queryFile);
    
    // Check if SQL file exists
    if (!fs.existsSync(sqlPath)) {
      console.error(`❌ SQL file not found at: ${sqlPath}`);
      reject(new Error(`SQL file not found: ${queryFile}`));
      return;
    }
    
    // Read SQL file
    let sql = fs.readFileSync(sqlPath, 'utf-8');
    
    // Convert SQLite syntax to PostgreSQL
    sql = convertSqliteToPostgres(sql, params);

    try {
      const result: QueryResult = await pool.query(sql, params);
      resolve(result.rows as T[]);
    } catch (err) {
      console.error('Query Error:', err);
      reject(err);
    }
  });
};

export const executeQueryDirect = <T = any>(
  sql: string,
  params: any[] = []
): Promise<T[]> => {
  return new Promise(async (resolve, reject) => {
    // Convert SQLite syntax to PostgreSQL
    sql = convertSqliteToPostgres(sql, params);

    try {
      const result: QueryResult = await pool.query(sql, params);
      resolve(result.rows as T[]);
    } catch (err) {
      console.error('Query Error:', err);
      reject(err);
    }
  });
};

// Helper function to convert SQLite queries to PostgreSQL
const convertSqliteToPostgres = (sql: string, params: any[]): string => {
  // Replace LIMIT clause
  sql = sql.replace(/LIMIT\s+(\d+)/gi, 'LIMIT $1');
  
  // Replace ? placeholders with $1, $2, etc.
  let paramIndex = 1;
  sql = sql.replace(/\?/g, () => `$${paramIndex++}`);
  
  return sql;
};

export const closeConnection = async (): Promise<void> => {
  await pool.end();
  console.log('Database connection pool closed');
};
