const express = require('express')
const router = express.Router()
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const feedbackRoutes = require('./feedbackRoutes')

module.exports = () => {
router.get('/', (req, res, next) => {
    res.send("Welcome to the Brooklyn Bouncers API")
})
router.use('/auth', authRoutes());

router.use('/products', productRoutes());

router.use('/feedback', feedbackRoutes()); 

return router
}
