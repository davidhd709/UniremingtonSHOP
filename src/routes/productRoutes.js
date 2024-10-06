const express = require('express');
const ProductController = require('../controllers/ProductController');
const ProductService = require('../services/ProductService');
const ProductRepository = require('../repositories/ProductRepository');

// Creamos un nuevo router
const router = express.Router();

// Inicializamos las dependencias
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

// Definimos las rutas para los productos
// GET /api/products - Obtener todos los productos
router.get('/', productController.getAllProducts.bind(productController));
// GET /api/products/:id - Obtener un producto por su ID
router.get('/:id', productController.getProductById.bind(productController));
// POST /api/products - Crear un nuevo producto
router.post('/', productController.createProduct.bind(productController));
// PUT /api/products/:id - Actualizar un producto existente
router.put('/:id', productController.updateProduct.bind(productController));
// DELETE /api/products/:id - Eliminar un producto
router.delete('/:id', productController.deleteProduct.bind(productController));

// Exportamos el router
module.exports = router;