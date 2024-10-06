const app = require('./src/app');
const { sequelize } = require('./src/config/database');
const ProductRepository = require('./src/repositories/ProductRepository');
const ProductService = require('./src/services/ProductService');
const syncProducts = require('./src/utils/syncProducts');

// Definimos el puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Sincronizamos la base de datos
    await sequelize.sync({ alter: true });
    console.log('Base de datos conectada y sincronizada');

    // Inicializamos las dependencias
    const productRepository = new ProductRepository();
    const productService = new ProductService(productRepository);

    // Sincronizamos los productos
    await syncProducts(productService);

    // Iniciamos el servidor
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error);
    process.exit(1);
  }
}

// Llamamos a la función para iniciar el servidor
startServer();