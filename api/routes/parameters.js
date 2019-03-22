const express = require('express');
const router = express.Router();
const browser = require('./../browser');

browser.initializeBrowser();

router.post( '/set', function( req, res, next ) {

    const userAddress = req.body.publicKey;
    const params = req.body.parameters;
    
    var _receipt;

    browser.setParameters( userAddress, params ).then( function( receipt ) {
        _receipt = receipt;
    } ).catch( function( err ) {
        console.log( err );
    } );

    res.status( 200 ).json( {
        message: "succesfully added parameters",
        receipt: _receipt
    } );

} );

router.get( '/get/:userAddress', function( req, res, next ) {

    const _userAddress = req.params.userAddress;

    browser.getParameters( _userAddress ).then( function( _params ) {
        res.status( 200 ).json( {
            publicKey: _userAddress,
            parameters: _params 
        } );
    } ).catch( function( err ) {
        console.log( err );
    } );

} );

module.exports = router;