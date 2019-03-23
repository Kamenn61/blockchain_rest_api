const express = require('express');
const router = express.Router();
const browser = require('../browser');

// browser.initializeBrowser();

router.post( '/set', function( req, res, next ) {

    const userAddress = req.body.publicKey;
    const params = req.body.parameters;

    browser.setParameters( userAddress, params ).then( function( receipt ) {
        res.status( 200 ).json( {
            message: "succesfully added parameters",
            receipt: receipt
        } );
    } ).catch( function( err ) {
        console.log( err );
    } );

} );

router.get( '/get/:userAddress', function( req, res, next ) {

    const userAddress = req.params.userAddress;

    browser.getParameters( userAddress ).then( function( params ) {
        res.status( 200 ).json( {
            publicKey: userAddress,
            parameters: params 
        } );
    } ).catch( function( err ) {
        console.log( err );
    } );

} );

module.exports = router;