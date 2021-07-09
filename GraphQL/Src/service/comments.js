const Post = require('../models/Post');
const { checkAuth } = require('../../utils/auth')
const { AuthorizationError, AuthenticationError, UserInputError } = require('apollo-server');
module.exports = {
    async createComment(_, { body, postId }, context) {
        try {
            const { username } = checkAuth(context);
            if (!username) throw new AuthorizationError("Please login");
            if (body.trim() === '') throw new UserInputError('Empty comments', { errors: { body: 'Comment body must not be empty' } })

            const post = await Post.findById(postId)
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
    async deleteComment(_, { postId, commentId }, context) {
        const { username } = checkAuth(context);
        if (!username) throw new AuthorizationError("Please login");
        const post = await Post.findById(postId);
        if (post) {
            const commentsIndex = post.comments.findIndex(comment => comment.id === commentId);
            console.log("commentsIndex", commentsIndex)
            if ((commentsIndex === 1) && post.comments[commentsIndex].username === username) {
                post.comments.splice(commentsIndex, 1);
                await post.save();
                return post;
            } else throw new AuthenticationError('Action not allowed')
        }
        else throw new UserInputError('Post not found');
    }
}