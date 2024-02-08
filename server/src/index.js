// Import modules
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const helmet = require('helmet');
const { dbPing } = require('./config/db');

// Import custom modules
const ApiError = require('./utils/ApiError');
const apiErrorHandler = require('./middleware/apiErrorHandler');

// Import development debug tool
const debugStartup = require('debug')('app:startup');

// General App configuration settings
const config = require('./config/config'); 
const corsOptions = require('./config/corsOptions')


// Initialise application using express
const app = express();

// Import central routes
const routes = require('./routes/routes');


// EXPRESS MIDDLEWARE:
// HTTP Header setter and security & CORS
app.use(cors({ origin : '*' }))
app.use(helmet());
// app.use(cors(corsOptions))
debugStartup('Parsing Cors and Helmet')
// (a) Returns middleware that only parses JSON/urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
debugStartup('POST parsing middleware enabled on all routes for JSON/URL');

app.use(fileUpload({ createParentPath: true }));


// (b) Cycle our requests through morgan to track our queries
app.use(morgan('dev'));

// (c) Main routing middleware function
app.use('/api', routes());

// (d) Not Found Route
app.use((req, res, next) => {
  next(ApiError.notFound());
});

// (e) Error Handler Middleware
app.use(apiErrorHandler);

// (f) Ping DB & Set Port
dbPing.then(() => {
  app.listen(
    config.port, 
    () => console.log(`Server is running on port: ${config.port}`)
  );
});