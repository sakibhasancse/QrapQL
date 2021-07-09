const Post = require('../models/Post');
const { checkAuth } = require('../../utils/auth')
const { AuthorizationError, AuthenticationError, UserInputError } = require('apollo-server');
module.exports = {
    async LikePost(_, { postId }, context) {
        try {
            console.log(`Like`)
            const { username } = checkAuth(context);
            const post = await Post.findById(postId);
            if (post) {
                if (post.likes.find((like) => like.username === username)) {
                    post.likes = post.likes.filter((like) => like.username !== username);

                } else {
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString(),
                    });
                }
                await post.save();
                return post;
            } throw new AuthenticationError('Post not found');

        } catch (error) {
            console.log(error)
            throw new Error('Internal error', error);
        }

    }

}