const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')
require('dotenv').config()

const Post = require('./models/Post')

const typeDefs = gql`
    type Post{
        id:ID!,
        title:String!,
        body:String!,
        createdAt:String!,
        user:String!,

    }
    type Query {
        getPosts:[Post]
    }
`;

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find()
                return posts
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}


const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})


//db connection
const MONGODB = process.env.MONGODB_URL
mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected')
        const port = 5000;
        return server.listen({ port }).then((res) => {
            console.log(`Server listen on : ${res.url}`)
        })

    })

