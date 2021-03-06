#!/bin/env node
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var connectionString = 'mongodb://127.0.0.1:27017/test';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var db = mongoose.connect(connectionString);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secretoption',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// var userModel = require("./public/assignment/server/models/users/user.model.js")(db, mongoose);
// var playerModel = require("./public/project/server/models/users/user.model.js")(db, mongoose);
// require("./public/security/security.js")(app, userModel, playerModel);

// require("./public/assignment/server/app.js")(app, db, mongoose, userModel);

// require("./public/project/server/app.js")(app, db, mongoose, playerModel);
//require("./public/project/server/models/schedule.model.js")(app);
//require("./public/project/server/models/userScheduleAvailability.model.js")(app);
//require("./public/project/server/models/user.model.js")(app);
//require("./public/project/server/services/user.service.server.js")(app);
//require("./public/project/server/services/schedule.service.server.js")(app);
//require("./public/project/server/services/userScheduleAvailability.service.server.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);
