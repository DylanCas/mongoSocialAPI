const user = require('../models/User');

module.exports = {
    
// get all users
    getUsers(req, res) {
        user.find()
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
        user.findOne({ _id: req.params.id })
        .select('-__v')
        .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No student with that ID' })
          : res.json({user})
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    },

// create new user
    createUser(req, res) {
        user.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    },

// update user by id
    updateUser(req, res) {
        user.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            // runValidators: true ensures that the updated thought meets the requirements set in the Thought model, and new: true ensures that the updated thought is returned
            { runValidators: true, new: true }
        )
    },

// delete user by id. TODO: *BONUS* delete associated thoughts
    deleteUser(req, res) {
        user.findOneAndDelete({ _id: req.params.id })
        .then((user) => {
            !user 
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json({ message: 'User deleted' })
        })
    },

// add new friend
// delete friend

}