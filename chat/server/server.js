import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import{useServer as useWsServer}from 'graphql-ws/lib/use/ws'
import express from 'express';
import { readFile } from 'node:fs/promises';
import { authMiddleware, handleLogin } from './auth.js';
import { resolvers } from './resolvers.js';
import { WebSocketServer } from 'ws';
import {createServer as createHttp} from 'node:http';
import { makeExecutableSchema } from '@graphql-tools/schema';

const PORT = 9000;

const app = express();
app.use(cors(), express.json());

app.post('/login', handleLogin);

function getContext({ req }) {
  if (req.auth) {
    return { user: req.auth.sub };
  }
  return {};
}

const typeDefs = await readFile('./schema.graphql', 'utf8');
const schema=makeExecutableSchema({typeDefs,resolvers})
const apolloServer = new ApolloServer({schema});
await apolloServer.start();
app.use('/graphql', authMiddleware, apolloMiddleware(apolloServer, {
  context: getContext,
}));

const httpServer=createHttp(app)
const wsServer= new WebSocketServer({server:httpServer,path:'/graphql'});
useWsServer({schema},wsServer)
httpServer.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
