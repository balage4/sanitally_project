/* eslint-disable consistent-return */
import Category from "../models/Category";
import logger from "../logger";
import throwError from "../common/throwError";
import { categoryDefaults } from "../defaults";

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
      return { message: 'Sikeres mentés' };
    } catch (err) {
      logger.error(err);
      throwError(500, 'Adatbázis hiba.')
    }
  },
  async initCategories() {
    try {
      await Category.insertMany(categoryDefaults);
      return 'Sikeres alaphelyzetbe állítás.';
    } catch (err) {
      logger.error(err);
      throwError(500, 'Adatbázis hiba.')
    }
  }
}