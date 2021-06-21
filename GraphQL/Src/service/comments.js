const Post = require('../models/Post');
const { checkAuth } = require('../../utils/auth')
const { AuthorizationError, UserInputError } = require('apollo-server');
const { updateOne } = require('../models/Post');
module.exports = {
    async createComment: (_, { body, postID }, context) => {
        const { username } = checkAuth(context);
        if (!username) throw new AuthorizationError("Please login");
        if (body.trim() === '') throw new UserInputError('Empty comments', { errors: { body: 'Comment body must not be empty' } })

        const post = await Post.findById(postID)
        if (!post) throw new UserInputError('Post not found');
        else {
            post.comments.unshift({
                body, username, createdAt: new Date().toISOString()
            })
            await post.save();
            return post;
        }
    }
}