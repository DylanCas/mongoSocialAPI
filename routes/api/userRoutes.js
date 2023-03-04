const router = require('express').Router();
// import functions from userController
const { getUsers, getSingleUser, createUser, updateUser, deleteUser } = require('../../controllers/userController');

// get all users. /api/users
router.route('/').get(getUsers)

// get single user by id. /api/users/:id
router.route('/:id').get(getSingleUser)

// create new user. /api/users
router.route('/').post(createUser)

// update user by id
router.route('/:id').put(updateUser)

// delete user by id
router.route('/:id').delete(deleteUser)

// add new friend

// delete friend

module.exports = router;