const postResolver = require('./posts')
const userResolver = require('./users');
const commentResolver = require('../../service/comments')

module.exports = {
    Query: {
        ...postResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation,
        ...postResolver.Mutation,
        ...commentResolver
    }
}