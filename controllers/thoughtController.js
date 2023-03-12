const thought = require('../models/Thought');

module.exports = {

// get all thoughts
    getThoughts(req, res) {
        thought.find()
        .select('-__v')
        .then(async (thought) => {
            res.json(thought)
        })
        .catch((err) => {
            console.log(`Error: ${err}`);
            res.status(500).json(err);
        })
    },

// get single thought by id
    getSingleThought(req, res) {
        thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({thought})
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    },

// create new thought
// have not figured out how to push thought id to user's thoughts array
// server responds 400, but thought is created
    createThought(req, res) {
        thought.create(req.body)
        .then((thought) => {
          // Update user's thoughts array
          return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thought._id } },
            // { new: true }
          );
        })
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    
    },

// update thought by id
// TODO: issue with updating thought. States wrong route, but get a 200 response. 
    updateThought(req, res) {
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            // runValidators: true ensures that the updated thought meets the requirements set in the Thought model, and new: true ensures that the updated thought is returned
            { new: true }
        )
        .then((thought) => {
            res.json(thought)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },

// delete thought by id
    deleteThought(req, res) {
        thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) => {
            !thought 
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json({ message: 'Thought deleted' })
        })
    },

// add reaction to thought
    addReaction(req, res) {
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought 
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json({ message: 'Reaction added' })
        )
        .catch((err) => res.status(400).json(err));
    },

// delete reaction from thought
    deleteReaction(req, res) {
        thought
            .findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            // { runValidators: true, new: true }
            )
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No reaction with that ID' })
                : res.json({ message: 'Reaction deleted' })
            )
            .catch((err) => res.status(400).json(err));
    },
}