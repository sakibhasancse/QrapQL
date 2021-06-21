const { gql } = require('apollo-server')

module.exports = gql`
   type Post{
        id:ID!,
        title:String!,
        slug:String!,
        body:String!,
        createdAt:String!,
        user:String!,
        username:String! ,
        comments: [Comment!]!,
        likes:[Like!]!

    }
    type Comment{
        id:ID!,
        body:String!,
        username:String!
        createdAt:String!
    }
    type Like{
        id:ID!,
        username:String!,
        createdAt:String!
    }
    type User{
        id:ID!,
        email:String!,
        password:String!,
        name:String!
        token: String!
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
        getPost(slug:String! ) : Post
    }
    type Mutation {
        register(registerInput : RegisterInput) : User!
        Login(email:String! , password:String!) : User!
        createPost(body:String! ,title:String!) : Post!
        deletePost(slug:String!) : String!
        createComment(body:String!, postId:ID!) : Post!
        deleteComment(postId:ID! ,comments:String!) : Post!
        LikePost(postId:ID!) : Post!
    }
`