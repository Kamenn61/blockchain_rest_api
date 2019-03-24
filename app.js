require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import Routes
const parametersRoute = require('./api/routes/parameters');
const authoriationRoute = require('./api/routes/authorization');
const userRoute = require('./api/routes/user');

mongoose.connect( 
  'mongodb+srv://kamenn:' + 
   process.env.MONGO_ATLAS_PW + 
   '@cluster0-auymu.mongodb.net/test?retryWrites=true',
   {
     useNewUrlParser: true
   }
);

app.use( morgan( 'dev' ) );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );

app.use( function( req, res, next ) {

  res.header( 'Access-Control-Allow-Origin', '*' );
  res.header( 'Access-Control-Allow-Headers', '*' );

  if( req.method === 'OPTIONS' ) {
    res.header( 'Access-Control-Allow-Methods', 'POST, GET' );
    return res.status( 200 ).json({});
  }

  next();

} );

// Routing
app.use( '/parameters', parametersRoute );
app.use( '/authorize', authoriationRoute );
app.use( '/user', userRoute );

// Error routes
app.use( function( req, res, next ) {
  const error = new Error( 'Not Found' );
  error.status = 404;
  next( error );
} );

// Error handler
app.use( function( error, req, res, next ) {
  res.status( error.status || 500 ).json( {
    error: {
      message: error.message
    }
  } );
} );

module.exports = app;