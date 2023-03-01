const User = require('../models/User');

module.exports = {
// get all users
    getUsers(req, res) {
        User.find()
        .then(async (user) => {
            
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