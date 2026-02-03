exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  // console.log("ROLE:", req.user.role);
  return res.status(403).json({
    message: "Admin access only for role admin",
  });
};
