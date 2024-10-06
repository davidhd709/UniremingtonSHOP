const axios = require('axios');

async function syncProducts(productService) {
  try {
    // Definimos las categorías y límites de productos a sincronizar
    const categories = [  
      { query: 'televisores', limit: 20, name: 'Televisores' },
      { query: 'celulares', limit: 20, name: 'Celulares' },
      { query: 'computadores portatiles', limit: 20, name: 'Computadores Portátiles' },
      { query: 'motos', limit: 20, name: 'motos' }
    ];

    // Iteramos sobre cada categoría
    for (const category of categories) {
      // Construimos la URL para la API de MercadoLibre
      const url = `https://api.mercadolibre.com/sites/MCO/search?q=${category.query}&limit=${category.limit}`;
      console.log('Obteniendo URL:', url);
      
      // Hacemos una solicitud GET a la API de MercadoLibre
      const response = await axios.get(url);
      const products = response.data.results;

      // Iteramos sobre cada producto obtenido
      for (const product of products) {
        const { title, price, thumbnail, id } = product;
        const description = product.description || 'Descripción no disponible';

        // Verificamos si el producto ya existe en nuestra base de datos
        const existingProducts = await productService.getAllProducts(title);
        if (existingProducts.length === 0) {
          // Si el producto no existe, lo creamos
          await productService.createProduct({
            name: title,
            price,
            image_url: thumbnail,
            description,
            category: category.name // Añadimos la categoría
          });
        }
      }
    }

    console.log('Productos sincronizados exitosamente');
  } catch (error) {
    console.error('Error al sincronizar productos:', error.response?.data || error.message);
  }
}

module.exports = syncProducts;