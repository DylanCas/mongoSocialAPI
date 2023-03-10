const router = require('express').Router();
// import functions from thoughtController
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thoughtController');

// get all thoughts. /api/thoughts
router.route('/').get(getThoughts)

// get single thought by id. /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought)

// create new thought(push id to user's thoughts array). /api/thoughts
router.route('/').post(createThought)

// update thought by id. /api/thoughts/:thoughtId
router.route('/:thoughtId').put(updateThought)

// delete thought by id. /api/thoughts/:thoughtId
router.route('/:thoughtId').delete(deleteThought)

// add reaction to thought. /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction)

// delete reaction from thought. /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router;