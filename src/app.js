const express = require('express');
const methodOverride = require('method-override');
const path = require('path');

const indexRouter = require('./routes/index');

const moviesRoutes = require('./routes/moviesRoutes');
const genresRoutes = require('./routes/genresRoutes');
const actorsRoutes = require('./routes/actorsRoutes');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');
app.use((req, res, next) => {
    res.locals.partials = {
        header: 'partials/header' // Ruta al partial header.ejs
    };
    next();
});

app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/', indexRouter);
app.use(moviesRoutes);
app.use(genresRoutes);
app.use(actorsRoutes);
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));
