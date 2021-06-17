const { model, Schema } = require('mongoose')
const userSchema = new Schema({
    username: { type: String },
    name: { type: String },
    email: { type: String },
    password: { type: String },
    createdAt: { type: String }
})

module.exports = model('User', userSchema)