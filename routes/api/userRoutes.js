const router = require('express').Router();
// import functions from userController
const { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/userController');

// get all users. /api/users
router.route('/').get(getUsers)

// get single user by id. /api/users/:userId
router.route('/:userId').get(getSingleUser)

// create new user. /api/users
router.route('/').post(createUser)

// update user by id. /api/users/:userId
router.route('/:userId').put(updateUser)

// delete user by id. /api/users/:userId
router.route('/:userId').delete(deleteUser)

// add new friend. /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend)

// delete friend. /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(deleteFriend)

module.exports = router;