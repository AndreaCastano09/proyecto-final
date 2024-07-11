    const EventEmitter = require('events');
    EventEmitter.defaultMaxListeners = 15; // Aumenta el límite de listeners*/


    //const Sequelize = require('sequelize');
    const express = require('express');
    const path = require('path');
    const logger = require('morgan');
    const cookieParser = require('cookie-parser');
    const methodOverride = require('method-override');
    const session = require('express-session');
    const passport = require('./config/passport'); // Importa Passport
    const bodyParser = require('body-parser');
    const flash = require('connect-flash');
    const authMiddleware = require('./middlewares/authMiddleware');
    const createError = require('http-errors'); // Para manejo de errores
    const port = 3000;
    
    require('dotenv').config();
    
    const app = express();
    const db = require('./models');
    const sequelize = require('./config/database');
    const initializePassport = require('./config/passport'); // Importar la configuración de Passport

    const orderRoutes = require('./routes/orderRoutes');
    const categoryRoutes = require('./routes/categoryRoutes');
    const productRoutes = require('./routes/productRoutes'); 
    const userRoutes = require('./routes/userRoutes'); 
    const adminRoutes = require('./routes/adminRoutes');

    // Configurar EJS como motor de plantillas
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // Middlewares
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(methodOverride('_method'));
    app.use(express.static(path.join(__dirname, 'public')));

    // Usar middleware personalizado en rutas específicas
    app.use('/protected-route', authMiddleware.isAuthenticated, (req, res) => {
        res.send('Esta es una ruta protegida');
    });

    // Configuración de la sesión
    app.use(session({ 
        secret: 'mysecret', 
        resave: false, 
        saveUninitialized: false }));

    app.use(flash());


    // Configuración de Passport
    //require('./config/passport'); // Asegúrate de tener tu configuración de Passport en este archivo

    // Inicialización de Passport
    app.use(passport.initialize());
    app.use(passport.session());


        // Rutas
        app.use('/orders', orderRoutes);
        app.use('/categories', categoryRoutes);
        app.use('/products', productRoutes);
        app.use('/users', userRoutes);
        app.use('/admin', adminRoutes);

        // Ruta principal
        /*app.get('/', (req, res) => {
            res.redirect('/products'); // Redirige a la página principal de productos o la que consideres principal
        });*/

        /*app.get('/', async (req, res) => {
            try {
                const categories = await db.Category.findAll({ include: db.Product });
                res.render('index', { categories });
            } catch (error) {
                res.status(500).send(error.message);
            }
        });*/

        app.get('/', async (req, res) => {
            try {
                const categories = await db.Category.findAll({ include: [{ model: db.Product, as: 'Products' }] });
                res.render('index', { categories });
            } catch (error) {
                res.status(500).send(error.message);
            }
        });

        app.get('/orders', (req, res) => {
            res.render('orders'); // Asegúrate de tener un archivo 'orders.ejs' en tu directorio views
        });

        app.get('/login', (req, res) => {
            res.render('login');
        });
        
        app.get('/admin/users', (req, res) => {
            res.render('admin/users');  // Asegúrate de que 'admin/users.ejs' exista en './views/admin/'
        });
        
        const obtenerProductosDesdeBaseDeDatos = () => {
            return [
                { name: 'Producto 1', quantity: 1, price: 100 },
                { name: 'Producto 2', quantity: 2, price: 150 }
            ];
        };
        
        // Ruta para mostrar el carrito de compras
        app.get('/shopping-cart', (req, res) => {
            let products = obtenerProductosDesdeBaseDeDatos(); // Obtener productos desde la base de datos
            res.render('shopping-cart', { products }); // Pasar los productos a la vista
        });

        // Conectar a la base de datos
        db.sequelize.sync({ alter: true })
        .then(() => {
            console.log('Base de datos sincronizada');
        })
        .catch((err) => {
            console.error('Error al sincronizar la base de datos:', err);
        });

        // Manejador de errores

        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).render('error', { message: err.message, error: err });
        });
        /*app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).render('error'); // Renderiza 'error.ejs' en caso de error interno
        });

        app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.render('error', { message: err.message, error: err });
        });*/


            const PORT = process.env.PORT || 3000;
            app.listen(PORT, () => {
                console.log(`Servidor corriendo en el puerto ${PORT}`);
            });

            // Exportar la aplicación
module.exports = app;