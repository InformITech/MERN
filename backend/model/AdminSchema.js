const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    user: {
        type: Boolean,
        default: true
    }
})

const Admin = mongoose.model('admins', adminSchema)
module.exports = { Admin }