import jwt from 'jsonwebtoken';
import User from '../models/User.js'

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';
    const decoded = jwt.verify(token, secret);
    req.id = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    console.error('JWT verification error:', error.message || error);
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

const verifyUser = (req, res, next) => {
    const userId = req.id;
    const paramsId = req.params.id
    const role = req.role;

        if(paramsId === userId || role === 'admin'){
          next()
        }else{
          res.status(401).json({success: false, message: "Access denied"})
        }
}

const verifyAdmin = (req, res, next) => {
  const role = req.role;
  if (role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access denied - Admins only' });
  }
};

export  {verifyToken, verifyAdmin, verifyUser};
