const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sass = require('node-sass-middleware');


/**
 * Controllers
 */
const home = require('./controllers/home');
const contactCollection = require('./controllers/contactcollection');
const mail = require('./controllers/mail');
const newContact = require('./controllers/newcontact');

/**
 * Create Express server.
 */
const app = express();


/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
});
// mongoose.connection.on('open', function (ref) {
//     mongoose.connection.db.listCollections().toArray(function(err, names) {
//     });
//
// });
mongoose.connection.once('open', function () {
    console.log('connected to mongodb');
});
mongoose.connect('mongodb://localhost:27017/nodedemo');


/**
 * Express configuration.
 */
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sass({
    src: path.join(__dirname + '/public'),
    dest: path.join(__dirname + '/public')
}));

//Third party modules
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/popper/dist'));
app.use('/js', express.static(__dirname + '/node_modules/moment/min'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/node_modules/font-awesome/css'));
app.use('/fonts', express.static(__dirname + '/node_modules/font-awesome/fonts'));

app.use(express.static(path.join(__dirname, 'public')));


/**
 * Primary app routes.
 */
app.get('/', home.index);

app.get('/contactcollection', contactCollection.getContactCollection);
app.get('/contactcollection/contactlist', contactCollection.getContactList);
app.delete('/contactcollection/deletecontact/:id', contactCollection.deleteContact);

app.get('/newcontact', newContact.getCreateNewContact);
app.post('/newcontact/addcontact', newContact.postNewContact);
app.get('/newcontact/editcontact/:id', contactCollection.editContact);
app.put('/newcontact/addcontact', newContact.putNewContact);

app.get('/mail', mail.getMail);
app.post('/mail', mail.sendMail);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
