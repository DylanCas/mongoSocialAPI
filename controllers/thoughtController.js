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
        thought.findOne({ _id: req.params.id })
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
    createThought(req, res) {
        thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(400).json(err));
    },

// update thought by id
    updateThought(req, res) {
        thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            // runValidators: true ensures that the updated thought meets the requirements set in the Thought model, and new: true ensures that the updated thought is returned
            { runValidators: true, new: true }
        )
    },

// delete thought by id
    deleteThought(req, res) {
        thought.findOneAndDelete({ _id: req.params.id })
        .then((thought) => {
            !thought 
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json({ message: 'Thought deleted' })
        })
    },

// add reaction to thought

// delete reaction from thought

}