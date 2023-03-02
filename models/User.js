const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        // regex to validate email address
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must use a valid email address']
        },
        // thoughts, array of _id values referencing the Thought model
        thoughts: [thoughtSchema],
        // friends, array of _id values referencing the User model (self-reference)
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
        },
)
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

module.exports = model('User', userSchema);