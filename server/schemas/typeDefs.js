const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    _id: ID
    bookId: ID!
    title: String!
    authors: [String]
    description: String
    link: String
    image: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(
      authors: [String]
      descripiton: String
      title: String
      bookId: ID!
      image: String
      link: String
    ): User
    removeBook(bookId: ID): User
  }
`;

module.exports = typeDefs;
