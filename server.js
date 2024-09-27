const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const MERCADOLIBRE_API_URL = 'https://api.mercadolibre.com/sites/MCO/search?q=televisores';

let db;

async function initializeDatabase() {
  db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await db.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      image_url VARCHAR(255),
      description TEXT
    )
  `);

  console.log('Base de datos inicializada correctamente');
}

async function syncProducts() {
  // ... (código de sincronización existente)
}

// Ruta para obtener todos los productos
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener un producto específico
app.get('/api/products/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para crear un nuevo producto
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, image_url, description } = req.body;
    const [result] = await db.execute(
      'INSERT INTO products (name, price, image_url, description) VALUES (?, ?, ?, ?)',
      [name, price, image_url, description]
    );
    res.status(201).json({ id: result.insertId, name, price, image_url, description });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un producto
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, image_url, description } = req.body;
    const [result] = await db.execute(
      'UPDATE products SET name = ?, price = ?, image_url = ?, description = ? WHERE id = ?',
      [name, price, image_url, description, id]
    );
    if (result.affectedRows > 0) {
      res.json({ id, name, price, image_url, description });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para eliminar un producto
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  try {
    await initializeDatabase();
    await syncProducts();

    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

startServer();