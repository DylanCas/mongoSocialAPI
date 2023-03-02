const router = require('express').Router();
// import functions from userController
const { getUsers, getSingleUser, createUser } = require('../../controllers/userController');

// get all users. /api/users
router.route('/').get(getUsers)

// get single user by id. /api/users/:id
router.route('/:id').get(getSingleUser)

// create new user. /api/users
router.route('/').post(createUser)

// update user by id

// delete user by id

// add new friend

// delete friend

module.exports = router;