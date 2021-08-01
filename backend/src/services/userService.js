import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import logger from '../logger';
import User from '../models/User';
import { validateLoginData, validateUserData } from '../utils';

export const userService = {
  async loginUser(data) {
    try {
      const { error } = validateLoginData(data);
      if (error) {
        return { status: 400, error: error.details[0].message };
      }

      const user = await User.findOne({ email: data.email }).exec();
      if (!user) {
        return { status: 400, error: `We couldn't find any user with this email address` };
      }

      const validPassword = await bcrypt.compare(data.password, user.password);
      if (!validPassword) {
        return { status: 400, error: 'Email or password is incorrect' };
      }

      const token = jwt.sign({
        email: user.email,
        role: user.role
      },
        process.env.TOKEN_SECRET,
        { expiresIn: '1day' }
      );

      return {
        status: 200,
        user: {
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          token
        }
      };

    } catch (err) {
      logger.error(err);
      return { status: 500, error: 'Something went wrong' };
    }
  },

  async createUser(data) {
    try {
      const { error } = validateUserData(data);
      if (error) {
        return { status: 400, error: error.details[0].message };
      }

      const emailExist = await User.findOne({ email: data.email }).exec();
      if (emailExist) {
        return { status: 400, error: 'Email address is already used' };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);

      const user = await new User({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword
      });
      await user.save();

      return {
        status: 201,
        message: 'User created'
      };

    } catch (err) {
      logger.error(err);
      return { status: 500, error: 'Something went wrong' };
    }
  },

  async getUsers() {
    try {
      const users = await User.find()

      return {
        status: 200,
        users
      }

    } catch (err) {
      logger.error(err);
      return { status: 500, error: 'Something went wrong' };
    }
  },

  async getUserById(id) {
    try {
      const singleUser = await User.findById(id).exec();
      return { status: 200, singleUser };
    } catch (err) {
      logger.error(err);
      return { status: 500, error: 'Something went wrong' };
    }
  },

  async updateUser(data) {
    try {
      const updateResponse = await User.findByIdAndUpdate(data.id,
        {
          firstName: data.updateData.firstName,
          lastName: data.updateData.lastName,
          role: data.updateData.role,
          providerTitle: data.updateData.providerTitle

        }, { new: true }
      );
      return { status: 200, message: updateResponse };
    } catch (err) {
      logger.error(err);
      return { status: 500, error: 'Something went wrong' };
    }
  },

  async deleteUser(id) {
    try {
      await User.findByIdAndRemove(id);
      return { status: 202, message: 'Successful delete' };
    } catch (err) {
      logger.error(err);
      return { status: 500, error: 'Something went wrong' };
    }
  }
}
