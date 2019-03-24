require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post( '/register', function( req, res, next ) {
    User.find( { numberPlate: req.body.numberPlate } )
        .exec()
        .then( function( user ) {
            if( use.length >= 1 ) {
                return res.status( 409 ).json( {
                    message: "Number plate already exists!"
                } );
            } else {
                bcrypt.hash( req.body.password, 10, function( err, hash ) {
                    if( err ) {
                        return res.status( 500 ).json( {
                            error: err
                        } );
                    } else {
                        const user = new User( {
                            _id: new mongoose.Types.ObjectId,
                            numberPlate: req.body.numberPlate,
                            password: hash 
                        } );
                        user
                        .save()
                        .then( function( result ) {
                            console.log( result );
                            res.status( 201 ).json( {
                                message: "User Created",
                                result: result
                            } );
                        } )
                        .catch( function( err ) {
                            console.log( err );
                            res.status( 500 ).json( {
                                error: err
                            } );
                        } );     
                    }
                } )
            }
        } )
        .catch();
} );

router.post( '/login', function( req, res, next ) {
    User.find( { numberPlate: req.body.numberPlate } )
        .exec()
        .then( function( user ) {
            if( user.length < 1 ) {
                return res.status( 401 ).json( {
                    message: "Auth failed"
                } );
            } else {
                bcrypt.compare( req.body.password, user[0].password, function( err, response ) {
                    if( err ) {
                        return res.status( 401 ).json( {
                            message: "Auth failed"
                        } );
                    }
                    if( response ) {
                        const token = jwt.sign( 
                            {
                                numberPlate: user[0].numberPlate,
                                userId: user[0]._id
                            }, 
                            process.env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            }
                        );
                        return res.status( 200 ).json( {
                            message: "Auth succesful!",
                            token: token
                        } );
                    }
                    res.status( 401 ).json( {
                        message: "Auth failed"
                    } );
                } );
            }
        } )
        .catch();
} );

router.delete( '/:userID', function( req, res, next ) {
    User.remove( { _id: req.params.userID } )
        .exec()
        .then( function( result ) {
            return res.status( 200 ).json( {
                message: "User deleted!",
                result: result
            } );
        } )
        .catch( function( err ) {
            return res.status( 500 ).json( {
                error: err
            } );
        } );
} );   

module.exports = router;