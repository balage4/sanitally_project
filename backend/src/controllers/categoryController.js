import { categoryService } from '../services';

export const categoryController = {

  async getCategories(req, res) {
    const categories = await categoryService.getCategories();
    res.status(categories.status).json(categories);
  },
  async createCategory(req, res) {
    const createResponse = await categoryService.createCategory(req.body);
    res.status(createResponse.status).json(createResponse);
  }
}