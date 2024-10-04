const axios = require('axios');

async function syncProducts(productService) {
  try {
    const categories = [
      { query: 'televisores', limit: 40, name: 'Televisores' },
      { query: 'celulares', limit: 40, name: 'Celulares' },
      { query: 'computadores portatiles', limit: 30, name: 'Computadores Portátiles' },
    ];

    for (const category of categories) {
      const url = `https://api.mercadolibre.com/sites/MCO/search?q=${category.query}&limit=${category.limit}`;
      console.log('Fetching URL:', url);
      const response = await axios.get(url);
      const products = response.data.results;

      for (const product of products) {
        const { title, price, thumbnail, id } = product;
        const description = product.description || 'Descripción no disponible';

        const existingProducts = await productService.getAllProducts(title);
        if (existingProducts.length === 0) {
          await productService.createProduct({
            name: title,
            price,
            image_url: thumbnail,
            description,
            category: category.name // Añadir categoría aquí
          });
        }
      }
    }

    console.log('Products synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing products:', error.response?.data || error.message);
  }
}

module.exports = syncProducts;
