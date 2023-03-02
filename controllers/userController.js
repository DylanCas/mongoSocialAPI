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

// delete user by id
    deleteUser(req, res) {

    }

// add new friend
// delete friend

}