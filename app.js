const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const parametersRoute = require('./api/routes/parameters');

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

app.use( '/parameters', parametersRoute );

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