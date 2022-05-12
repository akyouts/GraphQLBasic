const { buildSchema } = require('graphql');
module.exports = buildSchema(`
         
type Events {
    _id:ID!
    title:String!
    description:String!
    price:Float!
    date:String!
    creator: User
}

type User { 
    _id:ID
    email:String!,
    password:String
    events: [Events!]
 }

type RootQuery {
    events:[Events!]!
}

input EventsInput {
title:String!
description:String!
price:Float!,
creator:String!
}

input UserInput {
 email:String!
 password:String!
 
}

type RootMutation{
     createEvent(eventInput:EventsInput!):Events
     createUser(userInput:UserInput!):User
}
schema {
    
    query:RootQuery
    mutation:RootMutation

}



`)