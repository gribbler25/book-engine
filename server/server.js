const express = require("express");
const { ApolloServer } = require("apollo-server-express"); //*add ApolloServer
const path = require("path");

const { typeDefs, resolvers } = require("./schemas"); //*need these for Apollo svr start
const { authMiddleware } = require("./utils/auth"); //*auth Middleware to apply to Express server below
const db = require("./config/connection");
// const routes = require("./routes");  //don't need routes?

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const app = express();

app.use(express.urlencoded({ extended: false })); //change this to false like the module? thinking with graphql this may be differnet than with a REST API?
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// app.use(routes);
const startApolloServer = async () => {
  await server.start();
  await server.applyMiddleware({ app }); // * apply Apollo server to Express as middleware
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer();
