const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

// Creamos una instancia de la aplicación Express
const app = express();

// Habilitamos CORS para permitir solicitudes de diferentes orígenes
app.use(cors());

// Configuramos el middleware para parsear JSON en las solicitudes
app.use(express.json());

// Configuramos el middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Configuramos las rutas para los productos
app.use('/api/products', productRoutes);

// Exportamos la aplicación Express configurada
module.exports = app;