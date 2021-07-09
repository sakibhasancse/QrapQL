const Post = require('../models/Post');
const { checkAuth } = require('../../utils/auth')
const { AuthorizationError, UserInputError } = require('apollo-server');
module.exports = {
    async LikePost(_, { postID }, context) {
        try {
            const post = await Post.findById(postID);
            if (!post) throw new Error('Post not found');

        } catch (error) {

        }

    }

}