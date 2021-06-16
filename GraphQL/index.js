const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')

const typeDefs = gql`
    type Query {
        sayHi: String!
    }
`;

const resolvers = {
    Query: {
        sayHi: () => 'Hello World!'
    }
}


const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

const port = 5000;
server.listen({ port }).then((res) => {
    console.log(`Server listen on : ${res.url}`)
})