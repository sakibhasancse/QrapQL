const Post = require('../models/Post');
const { checkAuth } = require('../../utils/auth')
const { AuthorizationError, UserInputError } = require('apollo-server');
module.exports = {
    async LikePost(_, { postID }, context) {

    }

}