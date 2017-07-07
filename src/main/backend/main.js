var express = require('express');
//var graphqlHTTP = require('express-graphql');
import graphqlHTTP from 'express-graphql'
var {buildSchema} = require('graphql');
//import {schema} from './graphql/sample.graphql'

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    getMessage: String
  },
  type Mutation {
  setMessage(message: String): String
}
`);

var fakeDatabase = {};
// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  setMessage: function ({message}) {
    fakeDatabase.message = message;
    return message;
  },
  getMessage: function () {
    return fakeDatabase.message;
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({schema: schema, rootValue: root, graphiql: true}));
app.listen(8081);
console.log(schema)
console.log('Running a GraphQL API server at localhost:8081/graphql');
