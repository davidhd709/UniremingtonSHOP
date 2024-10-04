const app = require('./src/app');
const { sequelize } = require('./src/config/database');
const ProductRepository = require('./src/repositories/ProductRepository');
const ProductService = require('./src/services/ProductService');
const syncProducts = require('./src/utils/syncProducts');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database connected and synchronized');

    const productRepository = new ProductRepository();
    const productService = new ProductService(productRepository);

    await syncProducts(productService);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();