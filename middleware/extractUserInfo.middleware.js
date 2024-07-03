export const extractUserInfo = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify token
    console.log('Decoded token:', decoded);
    req.user = { _id: decoded.id }; // Set user info, assuming JWT payload contains user ID
    next();
  } catch (error) {
    console.log('Invalid token:', error);
    return res.status(401).json({ error: "Invalid token" });
  }
};
