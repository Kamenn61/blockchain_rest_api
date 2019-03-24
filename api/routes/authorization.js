const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post( '/', function( req, res, next ) {
    // Mock User
    const user = {
        numberPlate: "1-UPC-145",
        password: "@Trab61zon!"
    }

    jwt.sign( { user: user }, 'secretKey', function( err, token ) {
        res.status( 200 ).json( {
            token: token
        } );
    } );

} );

module.exports = router;