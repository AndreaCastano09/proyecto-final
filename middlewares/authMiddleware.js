// middlewares/authMiddleware.js
module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login'); // Redirigir a la página de login si no está autenticado
};

