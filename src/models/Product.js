const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Definimos el modelo Product
const Product = sequelize.define('Product', {
  // Campo para el nombre del producto
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Campo para el precio del producto
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  // Campo para la URL de la imagen del producto
  image_url: {
    type: DataTypes.STRING,
  },
  // Campo para la descripción del producto
  description: {
    type: DataTypes.TEXT,
  },
  // Campo para la fecha de creación
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  // Campo para la fecha de última actualización
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  // Habilitamos los timestamps automáticos
  timestamps: true,
});

// Exportamos el modelo Product
module.exports = Product;