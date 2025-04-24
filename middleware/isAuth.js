// middlewares/isAuth.js
// This middleware restricts access based on allowed roles
module.exports = function checkRole(allowedRoles = []) {
  return (req, res, next) => {
    const user = req.session.user;

    if (!user || !allowedRoles.includes(user.userType)) {
      return res.redirect("/"); // Add return to stop execution
    }

    next(); // Only runs if the user is valid and has access
  };
};
