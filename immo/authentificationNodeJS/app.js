var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var Sequelize = new require('sequelize');


//init DB connection
//FIXME Set userName, Password and DBName
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

const User = sequelize.define('user', {
    userName: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// We are going to protect /api routes with JWT
app.use('/api', expressJwt({secret: 'secret'}));

//En gros je t'explique : De base, il faut que redirige le user vers /authenticate tant qu'il est pas co. Une fois qu'il est connecté (c'est à dire que ses ID existent dans la base), depuis le navigateur tu peux faire des reqquêtes de page /api/?????
//EN effet, l'url /api est protegé (regarde les lignes aux dessus). Tu peux trouver la suite du tuto (normalement c'est plus ou moins du copier coller sur "https://auth0.com/blog/angularjs-authentication-with-cookies-vs-token/". C'est court et simple.
//Pour lancer le serveur c'est comme d'hab, "node /in/wwww". Voila, même si tu vas pas plus loin ou bien que ce n'est pas fonctionnel c'est pas grave, c'est toujours un truc à montrer. Si tu as des qquestions hésite pas, mais vraiment je peux que t'aider
//en nodejs, le react il me faudrait des semaines pour tout voir, j'ai déjà pas mal de boulot pour ne pas m'embrouiller l'esprit.


app.post('/authenticate', async function (req, res) {
    //TODO validate req.body.username and req.body.password
    //if is invalid, return 401
    await User.findOne({
        where: {
            userName: req.body.username,
            password: req.body.password
        }
    }).then(function (usr) {
        var profile = usr;
    });

    if (!profile) {
        res.send(401, 'Wrong user or password');
        return;
    }

    // We are sending the profile inside the token
    var token = jwt.sign(profile, 'secret', {expiresInMinutes: 60 * 5});

    res.json({token: token});
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
