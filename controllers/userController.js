const { User } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Joi = require('joi');

// Schema de validación de Joi para la creación de usuarios
const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
});

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.render('admin/users', { users });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        res.render('admin/user', { user });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createUser = async (req, res) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({ ...req.body, password: hashedPassword });
        res.redirect('/admin/users');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.update({ ...req.body, password: hashedPassword }, {
            where: { id: req.params.id }
        });
        res.redirect('/admin/users');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/users');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Login y Logout
exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin/orders',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/login');
};

exports.showLogin = (req, res) => {
    res.render('login');
};
