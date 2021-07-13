import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { validateLoginData, validateUserData } from '../utils';

export const userService = {
  async loginUser(data) {
    try {
      const { error } = validateLoginData(data);
      if (error) {
        return { status: 400, error: error.details[0].message }
      }

      const user = await User.findOne({ email: data.email }).exec();
      if (!user) {
        return { status: 400, error: `We couldn't find any user with this email address` }
      }

      const validPassword = await bcrypt.compare(data.password, user.password);
      if (!validPassword) {
        return { status: 400, error: 'Email or password is incorrect' }
      }

      const token = jwt.sign({ email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '1day' });

      return { status: 200, email: user.email, role: user.role, token };

    } catch (err) {
      return { status: 500, error: err }
    }
  },

  async createUser(data) {
    try {
      const { error } = validateUserData(data);
      if (error) {
        return { status: 400, error: error.details[0].message }
      }

      const emailExist = await User.findOne({ email: data.email }).exec();
      if (emailExist) {
        return { status: 400, error: 'Email address is already used' }
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
        status: 204,
        message: 'User created'
      }

    } catch (err) {
      return { status: 500, error: err }
    }
  }
}