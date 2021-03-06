const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const admin = require("firebase-admin");
const serviceAccount = require("./bin/firebase");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://remisystem-75ab6.firebaseio.com"
});

const api = require('./routes/api');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "RemiSystem Api",
            description: "RemiSystem Api Documentation",
            version: 1.0
        },
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", api);

module.exports = app;
