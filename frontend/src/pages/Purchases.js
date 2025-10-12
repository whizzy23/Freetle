import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Purchases = () => {
  const [books, setBooks] = useState([]);
  const { user } = useAuthContext();
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/books`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();
        if (!response.ok) throw new Error(json.error);
        setBooks(json.books || []);
      } catch (error) {
        console.error("Error fetching books:", error.message);
      }
    };
    if (user) {
      fetchPurchases();
      fetchBooks();
    }
  }, [user]);

  if (loading) return null;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Purchased Books</h2>
      {purchasedBooks.length === 0 ? (
        <div>You have not purchased any books yet.</div>
      ) : (
        <div className="row">
          {purchasedBooks.map((bookId) => {
            const book = books.find((b) => b.id === bookId);
            return (
              <div className="col-md-4 mb-3" key={bookId}>
                <Card className="p-3 story-cards">
                  <Card.Title>{book ? book.title : bookId}</Card.Title>
                  {book && book.src && (
                    <Link
                      to={book.src}
                      className="btn download-btn mt-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </Link>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Purchases;
