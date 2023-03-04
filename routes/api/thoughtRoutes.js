const router = require('express').Router();
// import functions from thoughtController
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought } = require('../../controllers/thoughtController');

// get all thoughts
router.route('/').get(getThoughts)

// get single thought by id
router.route('/:id').get(getSingleThought)

// create new thought(push id to user's thoughts array)
router.route('/').post(createThought)

// update thought by id
router.route('/:id').put(updateThought)

// delete thought by id
router.route('/:id').delete(deleteThought)

// add reaction to thought

// delete reaction from thought

module.exports = router;