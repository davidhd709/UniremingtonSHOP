const { Op } = require('sequelize');
const Product = require('../models/Product');

class ProductRepository {
  // Método para encontrar todos los productos, opcionalmente filtrados
  async findAll(filter = '') {
    const whereClause = filter
      ? { name: { [Op.like]: `%${filter}%` } }
      : {};
    return await Product.findAll({ where: whereClause });
  }

  // Método para encontrar un producto por su ID
  async findById(id) {
    return await Product.findByPk(id);
  }

  // Método para crear un nuevo producto
  async create(productData) {
    return await Product.create(productData);
  }

  // Método para actualizar un producto existente
  async update(id, productData) {
    const [updatedRows] = await Product.update(productData, { where: { id } });
    if (updatedRows > 0) {
      return await this.findById(id);
    }
    return null;
  }

  // Método para eliminar un producto
  async delete(id) {
    const deletedRows = await Product.destroy({ where: { id } });
    return deletedRows > 0;
  }
}

// Exportamos la clase ProductRepository
module.exports = ProductRepository;