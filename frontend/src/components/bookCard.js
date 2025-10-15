import { useState, useEffect } from "react";
import { Card, Button, Badge, Spinner } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBooksContext } from "../hooks/useBooksContext";
import { toast } from 'react-toastify';
import noCoverImage from "../assets/no-image.jpg";

const BookCard = ({ book }) => {
  const { user } = useAuthContext();
  const { dispatchBook } = useBooksContext();
  const { _id, title, description, price, available, coverImage, owner } = book;
  console.log(book);
  const [downloading, setDownloading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (user && owner && user.id === owner) {
      setIsOwner(true);
    }
  }, [user, owner]);

  const handleDownload = async () => {
    if (!user?.token) return;

    setDownloading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/books/download/${_id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      if (!response.ok) throw new Error("Failed to download");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title || "book"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
    }
    setDownloading(false);
  };

  const handleToggleAvailability = async () => {
    if (!user?.token) return;

    setUpdating(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/books/${_id}/availability`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ available: !available }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      dispatchBook({ type: "UPDATE_BOOK", payload: data });
    } catch (err) {
      console.log(err);
    }
    setUpdating(false);
  };

  const handleDelete = async () => {
    if (!user?.token) return;

    setDeleting(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/books/${_id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");
      dispatchBook({ type: "DELETE_BOOK", payload: _id });
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
    setDeleting(false);
  };

  return (
    <Card className="h-100 rounded-3 shadow-sm d-flex flex-column">
      {/* Image Section */}
      <div
        className="d-flex justify-content-center align-items-center overflow-hidden bg-light"
        style={{
          height: 200,
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      >
        <Card.Img
          src={coverImage?.url || noCoverImage}
          alt={title}
          style={{
            objectFit: "cover",
            width: "70%",
            height: "100%",
            borderRadius: "8px",
          }}
        />
      </div>

      {/* Content Section */}
      <Card.Body className="d-flex flex-column">
        {/* Title */}
        <Card.Title
          className="fw-semibold mb-1"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.4em",
            fontSize: "1rem",
          }}
        >
          {title}
        </Card.Title>

        {/* Description */}
        <Card.Text
          className="text-muted"
          style={{
            fontSize: "0.9rem",
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description || "No description available."}
        </Card.Text>

        {/* Price & Availability */}
        <div className="mt-auto pt-2 d-flex justify-content-between align-items-center">
          <span className="fw-bold">₹{price}</span>
          <Badge
            bg={available ? "light" : "secondary"}
            text={available ? "success" : "light"}
            className={`border ${available ? "border-success" : ""} lh-base`}
            style={{ fontSize: "0.8rem", padding: "4px 8px" }}
          >
            {available ? "Available" : "Unavailable"}
          </Badge>
        </div>

        {/* Owner Actions */}
        {isOwner && (
          <div className="mt-3 d-flex gap-2">
            <Button
              variant={available ? "outline-secondary" : "outline-success"}
              style={{ flex: 1 }}
              disabled={updating}
              onClick={handleToggleAvailability}
            >
              {updating ? (
                <Spinner animation="border" size="sm" />
              ) : available ? (
                "Mark Unavailable"
              ) : (
                "Mark Available"
              )}
            </Button>

            <Button
              variant="outline-danger"
              style={{ flex: 1 }}
              disabled={deleting}
              onClick={handleDelete}
            >
              {deleting ? <Spinner animation="border" size="sm" /> : "Delete"}
            </Button>
          </div>
        )}

        {/* Download Button */}
        <Button
          variant="outline-dark"
          onClick={handleDownload}
          disabled={downloading}
          className="mt-2"
        >
          {downloading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <>
              <i className="bi bi-download me-1"></i>Download
            </>
          )}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
