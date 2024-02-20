const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    status: {
        type: Boolean,
        default: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    profile: {
        type: String,
        default: null
    },
    username: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        default: null
    },
    age: {
        type:Number,
        default:0
    }
})

const User = mongoose.model('users', userSchema)
module.exports = { User }