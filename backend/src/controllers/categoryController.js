import { categoryService } from '../services';

export const categoryController = {

  async getCategories(req, res, next) {
    try {
      const categories = await categoryService.getCategories();
      res.status(200).json(categories);
    } catch (e) {
      next(e);
    }

  },
  async updateCategory(req, res, next) {
    try {
      const createResponse = await categoryService.updateCategory(req.body);
      res.status(201).json(createResponse);
    } catch (e) {
      next(e);
    }
  },
  async initCategories(req, res, next) {
    try {
      const initResponse = await categoryService.initCategories();
      res.status(201).json(initResponse);
    } catch (e) {
      next(e);
    }
  }
}