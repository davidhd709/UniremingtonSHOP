class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  // Método para obtener todos los productos, opcionalmente filtrados
  async getAllProducts(filter) {
    return await this.productRepository.findAll(filter);
  }

  // Método para obtener un producto por su ID
  async getProductById(id) {
    return await this.productRepository.findById(id);
  }

  // Método para crear un nuevo producto
  async createProduct(productData) {
    return await this.productRepository.create(productData);
  }

  // Método para actualizar un producto existente
  async updateProduct(id, productData) {
    return await this.productRepository.update(id, productData);
  }

  // Método para eliminar un producto
  async deleteProduct(id) {
    return await this.productRepository.delete(id);
  }
}

// Exportamos la clase ProductService
module.exports = ProductService;