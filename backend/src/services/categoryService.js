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
  async updateCategory(data) {
    try {
      await Category.findByIdAndUpdate(data.id, {
        $set: {
          categoryName: data.updateData.categoryName,
          categoryNotes: data.updateData.categoryNotes
        }
      });
      return {
        status: 200,
        message: 'Sikeres frissítés'
      }
    } catch (err) {
      logger.error(err);
      return { status: 500, error: 'Something went wrong' };
    }
  }
}