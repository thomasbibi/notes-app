import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY || "", {
    expiresIn: process.env.JWT_EXPIRY,
  });
  return token;
};

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY || "", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        
        resolve(decoded);
      }
    });
  });
};
