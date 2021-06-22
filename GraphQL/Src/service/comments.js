const Post = require('../models/Post');
const { checkAuth } = require('../../utils/auth')
const { AuthorizationError, UserInputError } = require('apollo-server');
module.exports = {
    async createComment(_, { body, postID }, context) {
        try {
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
        } catch (error) {
            throw new Error("Internal server error: " + error)
        }

    },
    async deleteComment(_, { postId, comments }, context) {
        const { username } = checkAuth(context);
        if (!username) throw new AuthorizationError("Please login");
        const post = await Post.findById(postId);
        if (post) {
            post.comments
        }
        else throw new UserInputError('Post not found');
    }
}