class ProductController {
    constructor(productService) {
      this.productService = productService;
    }
  
    async getAllProducts(req, res) {
      try {
        const filter = req.query.filter ? req.query.filter.toLowerCase() : '';
        const products = await this.productService.getAllProducts(filter);
        res.json(products);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    async getProductById(req, res) {
      try {
        const product = await this.productService.getProductById(req.params.id);
        if (product) {
          res.json(product);
        } else {
          res.status(404).json({ error: 'Producto no encontrado' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    async createProduct(req, res) {
      try {
        const product = await this.productService.createProduct(req.body);
        res.status(201).json(product);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    async updateProduct(req, res) {
      try {
        const updated = await this.productService.updateProduct(req.params.id, req.body);
        if (updated) {
          res.json(updated);
        } else {
          res.status(404).json({ error: 'Producto no encontrado' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    async deleteProduct(req, res) {
      try {
        const deleted = await this.productService.deleteProduct(req.params.id);
        if (deleted) {
          res.status(204).end();
        } else {
          res.status(404).json({ error: 'Producto no encontrado' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
  
  module.exports = ProductController;