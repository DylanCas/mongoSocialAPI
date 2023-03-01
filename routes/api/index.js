const router = require('express').Router();
// routes for the api
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// localhost:3001/api/thoughts
router.use('/thoughts', thoughtRoutes);
// localhost:3001/api/users
router.use('/users', userRoutes);

module.exports = router;