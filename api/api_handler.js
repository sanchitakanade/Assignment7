/* Name: Sanchita Kanade
   Class:CS648.02 Modern Full-Stack Web Development (Spring 2020)
   Assignment: 7
   File: api_handler.js
*/


const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const product = require('./product.js');

const resolvers = {
  Query: {
    productList: product.list,
    product: product.get,
    productCounts: product.counts,
    totalProducts: product.countRows,
  },
  Mutation: {
    addProduct: product.add,
    updateProduct: product.update,
    deleteProduct: product.delete,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
});

function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting:', enableCors);
  server.applyMiddleware({ app, path: '/graphql' });
}

module.exports = { installHandler };
