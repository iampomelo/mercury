var express = require('express'),
    path = require('path'),
    http = require('http'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('./webpack.config.js'),
    compiler = webpack(webpackDevConfig),
    config = require('./config'),
    debug = require('debug')('mercury:server'),
    mongoStore = require('connect-mongo')(session),
    cookie = require('cookie'),
    parseSignedCookie = require('./widget/utils').parseSignedCookie,
    authentication = require('./middleware/authentication'),
    routes = require('./route'),
    socketAPI = require('./socket-api'),
    app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

var sessionStore = new mongoStore({
    url: config.dbURL,
    ttl: 60 * 30
});
app.use(session({
    secret: config.cookieSecret,
    key: config.cookieName,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2
    },
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));

app.use(authentication);

app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', routes);

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '9999');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);


/**
 * Use socket.io
 */

var io = require('socket.io')(server);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Configure socket.io
 */


io.use((socket, next)=> {
    var handshakeData = socket.request;
    handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);
    if (handshakeData.cookie['mercury_cookie']) {
        sessionStore.get(parseSignedCookie(handshakeData.cookie['mercury_cookie'], config.cookieSecret), function (err, session) {
            if (err) {
                return next(new Error('Authentication error'));
            } else {
                socket.request.session = session;
                if (session.user) {
                    next();
                } else {
                    return next(new Error('No login'));
                }
            }
        });
    } else {
        return next(new Error('No session'));
    }
});


io.on('connection', socket=> {
    socket.on('mercury', req=> socketAPI[req.action](req.data, socket, io));
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}


// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function (err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });


module.exports = app;
