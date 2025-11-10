import express from 'express';
import { pool } from './db.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// Route 1 - Get all users
app.get('/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  console.log('Fetched users:', result.rows);
  res.json(result.rows);
});

app.post('/users', async (req, res) => {
  const { name } = req.body;
  const result = await pool.query('INSERT INTO users (name) VALUES ($1) RETURNING *', [name]);
  console.log('Added user:', result.rows[0]);
  res.status(201).json(result.rows[0]);
});


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
