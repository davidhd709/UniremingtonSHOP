class ProductService {
    constructor(productRepository) {
      this.productRepository = productRepository;
    }
  
    async getAllProducts(filter) {
      return await this.productRepository.findAll(filter);
    }
  
    async getProductById(id) {
      return await this.productRepository.findById(id);
    }
  
    async createProduct(productData) {
      return await this.productRepository.create(productData);
    }
  
    async updateProduct(id, productData) {
      return await this.productRepository.update(id, productData);
    }
  
    async deleteProduct(id) {
      return await this.productRepository.delete(id);
    }
  }
  
  module.exports = ProductService;