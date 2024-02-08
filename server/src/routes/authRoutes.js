const express = require('express');
const router = express.Router();
const verifyAuth = require('../middleware/verifyAuth');

const AuthController = require('../controllers/authController')
const AuthPolicy = require('../policies/authPolicy')

module.exports = () => {
    router.get('/users', verifyAuth.admin, 
        AuthController.listUsers
    );
    router.post('/register', AuthPolicy.validateAuth, AuthController.register);

    router.post('/login', AuthPolicy.validateAuth, AuthController.login);
    
    return router
}