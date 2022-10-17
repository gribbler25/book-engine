const { gql } = require("apollo-server-express");

const typeDefs = gql`
  input BookInput {
    authors: [String!]
    descripiton: String
    title: String!
    bookId: Int
    image: String
    link: String
  }

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
    bookId: Int
    title: String!
    authors: [String!]
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
    saveBook(input: BookInput): User
    removeBook(bookId: ID): User
  }
`;

module.exports = typeDefs;
