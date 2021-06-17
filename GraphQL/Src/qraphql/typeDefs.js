const { gql } = require('apollo-server')

module.exports = gql`
   type Post{
        id:ID!,
        title:String!,
        body:String!,
        createdAt:String!,
        user:String!,

    }
    type User{
        id:ID!,
        email:String!,
        password:String!,
        name:String!
        createdAt:String!
    }
    input RegisterInput {
        name:String!,
        email:String!,
        password:String!,
        confirmPassword:String!,
    
    }
    type Query {
        getPosts:[Post]
    }
    type Mutation {
        register(registerInput : RegisterInput) : User!
    }
`