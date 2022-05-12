const express = require('express');
const app = express();
const {graphqlHTTP} = require('express-graphql');
const bcrypt = require('bcrypt');
const graphQLSchema = require('./GraphQL/Schema/index');
const graphQLResolvers = require('./GraphQL/Resolvers/index')



// mogoose config
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://0.0.0.0:27017/graphql');
}

// models

const res = require('express/lib/response');


app.use(express.json());




app.use('/graphql', graphqlHTTP({
    schema: graphQLSchema ,
    rootValue: graphQLResolvers,
    graphiql: true
}))


app.listen(3001, () => {
    console.log("Server is running on port 3001");
})
