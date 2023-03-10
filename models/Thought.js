const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const moment = require('moment');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get method to format the timestamp on query.
            // or try `get: timestamp => new Date(timestamp).toLocaleDateString()`
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        // reference to the associated user
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
        },
    },
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

module.exports = model('Thought', thoughtSchema);