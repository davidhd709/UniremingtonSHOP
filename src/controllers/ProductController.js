class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  // Método para obtener todos los productos
  async getAllProducts(req, res) {
    try {
      // Obtenemos el filtro de la query, si existe
      const filter = req.query.filter ? req.query.filter.toLowerCase() : '';
      // Llamamos al servicio para obtener los productos filtrados
      const products = await this.productService.getAllProducts(filter);
      // Enviamos los productos como respuesta
      res.json(products);
    } catch (error) {
      // Si hay un error, enviamos una respuesta de error
      res.status(500).json({ error: error.message });
    }
  }

  // Método para obtener un producto por su ID
  async getProductById(req, res) {
    try {
      // Llamamos al servicio para obtener el producto por su ID
      const product = await this.productService.getProductById(req.params.id);
      if (product) {
        // Si el producto existe, lo enviamos como respuesta
        res.json(product);
      } else {
        // Si no se encuentra el producto, enviamos un error 404
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      // Si hay un error, enviamos una respuesta de error
      res.status(500).json({ error: error.message });
    }
  }

  // Método para crear un nuevo producto
  async createProduct(req, res) {
    try {
      // Llamamos al servicio para crear el producto
      const product = await this.productService.createProduct(req.body);
      // Enviamos el producto creado como respuesta con estado 201 (Created)
      res.status(201).json(product);
    } catch (error) {
      // Si hay un error, enviamos una respuesta de error
      res.status(500).json({ error: error.message });
    }
  }

  // Método para actualizar un producto
  async updateProduct(req, res) {
    try {
      // Llamamos al servicio para actualizar el producto
      const updated = await this.productService.updateProduct(req.params.id, req.body);
      if (updated) {
        // Si se actualizó correctamente, enviamos el producto actualizado
        res.json(updated);
      } else {
        // Si no se encuentra el producto, enviamos un error 404
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      // Si hay un error, enviamos una respuesta de error
      res.status(500).json({ error: error.message });
    }
  }

  // Método para eliminar un producto
  async deleteProduct(req, res) {
    try {
      // Llamamos al servicio para eliminar el producto
      const deleted = await this.productService.deleteProduct(req.params.id);
      if (deleted) {
        // Si se eliminó correctamente, enviamos una respuesta vacía con estado 204 (No Content)
        res.status(204).end();
      } else {
        // Si no se encuentra el producto, enviamos un error 404
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      // Si hay un error, enviamos una respuesta de error
      res.status(500).json({ error: error.message });
    }
  }
}

// Exportamos la clase ProductController
module.exports = ProductController;