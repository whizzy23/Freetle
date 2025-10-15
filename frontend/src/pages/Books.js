import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBooksContext } from "../hooks/useBooksContext";
import BookForm from "../components/bookForm";
import BookCard from "../components/bookCard";

const BookList = ({ books }) => {
  if (!books?.length) {
    return (
      <Alert variant="info" className="text-center">
        You have not uploaded any books yet.
      </Alert>
    );
  }
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {books.map((book) => (
        <Col key={book._id}>
          <BookCard book={book} />
        </Col>
      ))}
    </Row>
  );
};

const Books = () => {
  const { user } = useAuthContext();
  const { books, dispatchBook } = useBooksContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.token) return;
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/books/user`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch books");
        dispatchBook({ type: "SET_BOOKS", payload: data });
      } catch (error) {
        console.error("fetchBooks error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [dispatchBook, user?.token]);

  return (
    <Container className="mb-5">
      <h1 className="text-center mt-5">My Books</h1>

      <div className="d-flex justify-content-end mb-4">
        <BookForm
          onSuccess={(newBook) => {
            dispatchBook({ type: "ADD_BOOK", payload: newBook });
          }}
        />
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <BookList books={books} />
      )}

    </Container>
  );
};

export default Books;
