const User = require('../models/User');

module.exports = {
// get all users
    getUsers(req, res) {
        User.find()
        .select('-__v')
        .then(async (user) => {
            res.json(user)
        })
        .catch((err) => {
            console.log(`Error: ${err}`);
            res.status(500).json(err);
        })
    },
// get single user by id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
        .select('-__v')
    }

// create new user

// delete user

// add new friend
// delete friend

}