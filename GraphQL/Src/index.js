const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()

const typeDefs = require("./qraphql/typeDefs")
const resolvers = require("./qraphql/resolvers")

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

