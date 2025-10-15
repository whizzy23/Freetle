import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
import BookCard from "../components/bookCard";

const PurchasesList = ({ books, purchasedBooks }) => {
  if (!purchasedBooks?.length) {
    return (
      <Alert variant="info" className="text-center">
        You have not purchased any books yet.
      </Alert>
    );
  }
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {purchasedBooks.map((bookId) => {
        const book = books.find((b) => (b._id || b.id) === bookId);
        return book ? (
          <Col key={bookId}>
            <BookCard book={book} />
          </Col>
        ) : null;
      })}
    </Row>
  );
};

const Purchases = () => {
  const [books, setBooks] = useState([]);
  const { user } = useAuthContext();
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/user/purchases`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch purchases");
        setPurchasedBooks(data.purchasedBooks || []);
      } catch (err) {
        console.error("Error fetching purchases:", err.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/books/`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();
        if (!response.ok) throw new Error(json.error);
        setBooks(json || []);
      } catch (error) {
        console.error("Error fetching books:", error.message);
      }
    };
    if (user) {
      fetchPurchases();
      fetchBooks();
    }
  }, [user]);

  return (
    <Container className="mb-5">
      <h1 className="text-center my-5">Purchased Books</h1>
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <PurchasesList books={books} purchasedBooks={purchasedBooks} />
      )}
    </Container>
  );
};

export default Purchases;
