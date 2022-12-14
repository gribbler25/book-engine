import React from "react";
// {useState}?
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { useMutation } from "@apollo/client";
// import { getMe, deleteBook } from "../utils/API";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";
import { REMOVE_BOOK } from "../utils/mutations";

const SavedBooks = () => {
  // const [userData, setUserData] = useState({});
  const { loading, data, refetch } = useQuery(GET_ME);
  console.log(data);
  // setUserData(data);
  const userData = data?.me || [];
  console.log(userData);
  const [removeBook] = useMutation(REMOVE_BOOK);
  // const userDataLength = Object.keys(userData).length;

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      console.log(bookId);
      // const updatedUser =
      const data = await removeBook({ variables: { bookId } }); // ? variables corect?
      console.log(data);
      refetch();
      // setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (e) {
      console.error("this  error from handleDeleteBook", e);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book?.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book?.image}
                    alt={`The cover for ${book?.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book?.title}</Card.Title>
                  <p className="small">Authors: {book?.authors}</p>
                  <Card.Text>{book?.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
