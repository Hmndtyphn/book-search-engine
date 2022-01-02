// express dependency
const express = require('express');

// import Apollo Server and authentication middleware
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');

// import typde defs and resolvers
const { typeDefs, resolvers } = require('./schemas'); 
// connect to db
const db = require('./config/connection');

// connect to Port 3001
const app = express();
const PORT = process.env.PORT || 3001;

// create Apollo server to pass schema data in (need to rebuild Schema!)
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// integrate Apollo server with express
server.applyMiddleware({ app });

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// creates static page build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(_dirname, '../client/build')));
  app.get("*", (req,res) => {
    res.sendFile(path.resolve(_dirname, "../client/build", "index.html"));
  })
}

