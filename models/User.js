const mongoose = require('mongoose');

// Define a schema for the User model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

// Export the User model to use it in other parts of your application
module.exports = User;