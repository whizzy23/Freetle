import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Badge,
} from "react-bootstrap";
import { useUserContext } from "../hooks/useUserContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import noCoverImage from "../assets/no-image.jpg";

const PurchasePage = () => {
  const { userData, dispatchUser } = useUserContext();
  const { user } = useAuthContext();

  const [books, setBooks] = useState([]);
  const [isFetchingBooks, setIsFetchingBooks] = useState(true);
  const [loadingBookId, setLoadingBookId] = useState(null);

  const purchasedBooks = userData?.purchasedBooks || [];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Helper to compare IDs
  const sameId = (a, b) => String(a || "") === String(b || "");

  // Fetch user details & books
  useEffect(() => {
    if (!user?.token) {
      setBooks([]);
      setIsFetchingBooks(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/user/details`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        dispatchUser({ type: "SET_USER", payload: json });
        setName(json.name || "");
        setEmail(json.email || "");
      } catch (err) {
        toast.error("Failed to load user data");
      }
    };

    const fetchBooks = async () => {
      setIsFetchingBooks(true);
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/books/available`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await res.json();
        if (res.ok) setBooks(json.filter((b) => b.available !== false));
      } catch (error) {
        toast.error("Could not load books");
      } finally {
        setIsFetchingBooks(false);
      }
    };

    fetchUserData();
    fetchBooks();
  }, [user, dispatchUser]);

  // Payment handling
  const handlePayment = async (bookId) => {
    const book = books.find((b) => sameId(b._id, bookId));
    if (!book) return toast.error("Book not found");

    setLoadingBookId(bookId);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/payment/createOrder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ amount: book.price }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      handlePaymentVerify(data.data, bookId);
    } catch {
      toast.error("Payment could not be processed.");
      setLoadingBookId(null);
    }
  };

  const handlePaymentVerify = (orderData, bookId) => {
    const book = books.find((b) => sameId(b._id, bookId));
    const rzp = new window.Razorpay({
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: "INR",
      name: "E-Book Purchase",
      description: `Purchasing ${book?.title || ""}`,
      order_id: orderData.id,
      prefill: { name, email },
      handler: async (response) => {
        try {
          const verifyRes = await fetch(
            `${process.env.REACT_APP_API_URL}/api/payment/verifyPayment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify({ ...response, bookId }),
            }
          );
          const verifyData = await verifyRes.json();
          if (verifyData.message) {
            toast.success("Payment successful!");
            dispatchUser({ type: "UPDATE_PURCHASES", payload: bookId });
          } else toast.error("Payment verification failed");
        } finally {
          setLoadingBookId(null);
        }
      },
      modal: { ondismiss: () => setLoadingBookId(null) },
      theme: { color: "#5f63b8" },
    });

    rzp.open();
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center fw-bold">Buy E-Book</h2>

      {!user ? (
        <div className="alert alert-warning text-center">
          Please log in to purchase books.
        </div>
      ) : isFetchingBooks ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-5">No books available.</div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {books.map((book) => {
            const id = book._id;
            const already = purchasedBooks.some((p) => sameId(p, id));
            const processing = sameId(loadingBookId, id);

            return (
              <Col key={id} className="mb-4">
                <Card
                  className="rounded-4 shadow-sm d-flex flex-column"
                  style={{ height: 500, width: "100%" }}
                >
                  <div style={{ height: "45%", overflow: "hidden" }}>
                    <Card.Img
                      variant="top"
                      src={book.coverImage.url || noCoverImage}
                      alt={book.title}
                      className="w-100 h-100 rounded-top-4"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Card.Title className="text-truncate">
                        {book.title}
                      </Card.Title>
                      <Badge bg="light" text="dark" className="border">
                        ₹{book.price}
                      </Badge>
                    </div>

                    <Card.Text
                      className="text-muted"
                      style={{
                        fontSize: "0.9rem",
                        flexGrow: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {book.description || "No description available."}
                    </Card.Text>

                    <Button
                      variant={already ? "outline-secondary" : "dark"}
                      className="mt-auto"
                      disabled={already || processing}
                      onClick={() => handlePayment(id)}
                    >
                      {processing ? (
                        <Spinner animation="border" size="sm" />
                      ) : already ? (
                        "Purchased"
                      ) : (
                        "Buy Now"
                      )}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default PurchasePage;
