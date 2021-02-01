import express from 'express';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import expressPlayGround from 'graphql-playground-middleware-express';

const PORT = 5001;
const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(compression());

const server = new ApolloServer({
  schema,
  introspection: true,
});

server.applyMiddleware({ app });
app.get(
  '/',
  expressPlayGround({
    endpoint: '/graphql',
  })
);

httpServer.listen({ port: PORT }, () =>
  console.log(`http://localhost:${PORT}/graphql`)
);
