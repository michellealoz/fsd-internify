module.exports = function checkAdminLevel(requiredLevels = []) {
    return (req, res, next) => {
      const adminLevel = req.user?.accessLevel;
  
      if (!adminLevel) {
        return res.status(403).json({ message: "Access level not found" });
      }
  
      if (adminLevel === "super" || requiredLevels.includes(adminLevel)) {
        return next();
      }
  
      return res.status(403).json({ message: "Insufficient permissions" });
    };
  };
