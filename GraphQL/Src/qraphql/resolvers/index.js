const postResolver = require('./posts')
const userResolver = require('./users');
const commentResolver = require('../../service/comments')
const LikePostResolver = require('../../service/likes');
const SubscriptionResolver = require('../../service/pubSub');

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },

    Query: {
        ...postResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation,
        ...postResolver.Mutation,
        ...commentResolver,
        ...LikePostResolver
    },
    Subscription: {
        ...SubscriptionResolver.Subscription
    }
}