import Category from "../models/Category";
import logger from "../logger";

export const categoryService = {

  async getCategories() {
    try {
      const categories = await Category.find({});
      return { status: 200, categories };
    } catch (err) {
      logger.error(err);
      return { status: 500, error: 'Something went wrong' };
    }
  },
  async createCategory(data) {
    try {
      const newCategory = await new Category({
        categoryName: data.categoryName,
        categoryNotes: data.categoryNotes
      })
      await newCategory.save();
      return {
        status: 201,
        message: 'Category created'
      }
    } catch (err) {
      logger.error(err);
      return { status: 500, error: 'Something went wrong' };
    }
  }
}