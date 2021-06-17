const Post = require('../../models/Post')

module.exports = {
    Query: {
        async getPosts() {
            const posts = await Post.find()
            return posts
        }

    }
}