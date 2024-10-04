const { Op } = require('sequelize');
const Product = require('../models/Product');

class ProductRepository {
  async findAll(filter = '') {
    const whereClause = filter
      ? { name: { [Op.like]: `%${filter}%` } }
      : {};
    return await Product.findAll({ where: whereClause });
  }

  async findById(id) {
    return await Product.findByPk(id);
  }

  async create(productData) {
    return await Product.create(productData);
  }

  async update(id, productData) {
    const [updatedRows] = await Product.update(productData, { where: { id } });
    if (updatedRows > 0) {
      return await this.findById(id);
    }
    return null;
  }

  async delete(id) {
    const deletedRows = await Product.destroy({ where: { id } });
    return deletedRows > 0;
  }
}

module.exports = ProductRepository;