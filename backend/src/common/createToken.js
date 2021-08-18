import jwt from 'jsonwebtoken';

export const generateToken = (userEmail, userRole) => {
  const token = jwt.sign({
    email: userEmail,
    role: userRole
  },
    process.env.TOKEN_SECRET,
    { expiresIn: '1week' }
  )
  return token;
};
