// express dependency
const express = require('express');

// import Apollo Server and authentication middleware
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');



const app = express();
const PORT = process.env.PORT || 3001;

