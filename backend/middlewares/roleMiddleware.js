// middlewares/roleMiddleware.js
const allowRoles = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden: Access Denied" });
      }
      next();
    };
  };
  
  module.exports = { allowRoles };
  