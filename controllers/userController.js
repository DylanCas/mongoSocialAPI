const user = require("../models/User");

module.exports = {
  // get all users
  getUsers(req, res) {
    user
      .find()
      .select("-__v")
      .then(async (user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
        res.status(500).json(err);
      });
  },

  // get single user by id
  getSingleUser(req, res) {
    user
      .findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No student with that ID" })
          : res.json({ user })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create new user
  createUser(req, res) {
    user
      .create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  // update user by id
  // TODO: update username in thoughts and reactions
  updateUser(req, res) {
    user.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      // runValidators: true ensures that the updated thought meets the requirements set in the Thought model, and new: true ensures that the updated user is returned
      { new: true, runValidators: true }
    )
    .then(updateUser => {
      if (!updateUser) {
        return res.status(404).json({ message: 'No user with that ID' })
      }
      res.json(updateUser)
    })
    .catch(err => {
      res.status(400).json(err)
    })
  },

  // delete user by id. 
  // TODO: *BONUS* delete associated thoughts
  deleteUser(req, res) {
    user.findOneAndDelete({ _id: req.params.userId }).then((user) => {
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json({ message: "User deleted" });
    });
  },

  // add new friend, add to user friends array
  addFriend(req, res) {
    user
      .findOneAndUpdate(
        { _id: req.params.userId },
        // addtoSet prevents duplicate entries
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete friend
  deleteFriend(req, res) {
    user
      .findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
