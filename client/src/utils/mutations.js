import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
//need help with these !
export const SAVE_BOOK = gql`
mutation saveBook(title:String!, authors: [String!], bookId:Int!){
    saveBook(title:$title, authors:$[authors], bookId:$bookId){
        _id
        username
        savedBooks

    }
}`;
export const REMOVE_BOOK = gql`
mutation removeBook(bookId: Int!){
    removeBook(bookId: $bookId){
        _id
        username
        savedBooks
    }
}`;
