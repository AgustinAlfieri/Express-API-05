import mysql from 'mysql2/promise';

// Un pool de conexiones permite manejar múltiples conexiones a la base de datos
// de manera eficiente, reutilizando conexiones existentes y evitando la sobrecarga
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'dsw',
  password: process.env.DB_PASSWORD || 'dsw',
  database: process.env.DB_NAME || 'heroclash4geeks',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});
