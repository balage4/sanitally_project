/* eslint-disable consistent-return */
import Category from "../models/Category";
import logger from "../logger";
import throwError from "../common/throwError";

export const categoryService = {

  async getCategories() {
    try {
      const categories = await Category.find();
      return categories;
    } catch (err) {
      logger.error(err);
      throwError(500, err.message);
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
      return 'Sikeres mentés';
    } catch (err) {
      logger.error(err);
      throwError(500, 'Adatbázis hiba.')
    }
  }
}