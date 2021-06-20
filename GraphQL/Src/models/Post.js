const { model, Schema } = require('mongoose')
const postSchema = new Schema({
    title: { type: String },
    slug: { type: String },
    body: { type: String },
    username: { type: String },
    createdAt: { type: String },
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }],
    likes: [
        {
            username: String,
            createdAt: String
        }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Post', postSchema)