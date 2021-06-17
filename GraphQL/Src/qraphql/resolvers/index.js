const postResolver = require('./posts')
const userResolver = require('./users')

module.exports = {
    Query: {
        ...postResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation
    }
}