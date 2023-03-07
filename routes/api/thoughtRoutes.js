const router = require('express').Router();
// import functions from thoughtController
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thoughtController');

// get all thoughts. /api/thoughts
router.route('/').get(getThoughts)

// get single thought by id. /api/thoughts/:id
router.route('/:id').get(getSingleThought)

// create new thought(push id to user's thoughts array). /api/thoughts
router.route('/').post(createThought)

// update thought by id. /api/thoughts/:id
router.route('/:id').put(updateThought)

// delete thought by id. /api/thoughts/:id
router.route('/:id').delete(deleteThought)

// add reaction to thought. /api/thoughts/:id/reactions
router.route('/:id/reactions').post(addReaction)

// delete reaction from thought. /api/thoughts/:id/reactions/:reactionId
router.route('/:id/reactions/:reactionId').delete(deleteReaction)

module.exports = router;