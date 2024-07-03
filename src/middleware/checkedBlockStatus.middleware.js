import User from '../models/user.models.js';
import JWT from 'jsonwebtoken';

const secret = "Super@Dooper"; // Ensure this matches the secret used for JWT signing

const checkBlockedStatus = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const decoded = JWT.verify(token, secret);
    const userId = decoded.id;

    const user = await User.findById(userId);

    if (user && user.status === 'blocked') {
      return res.status(403).json({ message: 'User is blocked' });
    }

    next();
  } catch (error) {
    console.error('Error checking user blocked status', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default checkBlockedStatus;
