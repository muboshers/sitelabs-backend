export const adminMiddleware = (req, res, next) => {
  if (req.headers.isadmin) {
    req.isAdmin = true;
    next();
  } else {
    res.status(401).json({ message: "Sizda bunday vakolat yo'q" });
  }
};
