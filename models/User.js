const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        // email, string, required, unique, must match valid email
        email: {
            type: String,
            required: true,
            unique: true,
            // TODO: Add validation for email
        },
        // thoughts, array of _id values referencing the Thought model
        thoughts: [thoughtsSchema],
        // friends, array of _id values referencing the User model (self-reference)
        friends: [friendsSchema]
    }
)