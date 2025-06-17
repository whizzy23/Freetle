import { useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { useUserContext } from "../hooks/useUserContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useStoriesContext } from "../hooks/useStoriesContext";
import { toast } from "react-toastify";

const StoryForm = ({ userData }) => {
  const [newStory, setNewStory] = useState({
    title: "",
    description: "",
    content: "",
  });
  const [coverImage, setCoverImage] = useState(null);
  const [emptyFieldError, setEmptyFieldError] = useState("");
  const { dispatchUser } = useUserContext();
  const { user } = useAuthContext();
  const { dispatchStory } = useStoriesContext();
  const [showPenNameModal, setShowPenNameModal] = useState(false);
  const [penName, setPenName] = useState("");
  const [penNameError, setPenNameError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const author = userData.penName;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStory({ ...newStory, [name]: value });
  };

  const handleOpenModal = async () => {
    if (!author) {
      setShowPenNameModal(true);
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setNewStory({ title: "", description: "", content: "" });
    setEmptyFieldError("");
    setShowModal(false);
  };

  const handleClosePenNameModal = () => {
    setPenName("");
    setPenNameError("");
    setShowPenNameModal(false);
  };

  const handlePenNameSubmit = async () => {
    if (!penName.trim()) {
      setPenNameError("Pen name is required");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ ...userData, penName }),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error);
      } else {
        dispatchUser({ type: "UPDATE_USER", payload: json });
        dispatchUser({ type: "SET_USER", payload: json });
        setShowPenNameModal(false);
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error updating user profile:", error.message);
    }
  };

  const handleAddStory = async (e) => {
    e.preventDefault();

    if (
      !newStory.title.trim() ||
      !newStory.description.trim() ||
      !newStory.content.trim()
    ) {
      setEmptyFieldError("All fields are required");
    } else {
      try {
        const formData = new FormData();
        formData.append("title", newStory.title);
        formData.append("description", newStory.description);
        formData.append("content", newStory.content);
        formData.append("author", author);

        if (coverImage) formData.append("coverImage", coverImage);

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/stories/createStory`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${user.token}` },
            body: formData,
          }
        );
        const json = await response.json();
        if (!response.ok) {
          throw new Error("Failed to upload story");
        }
        dispatchStory({ type: "CREATE_STORY", payload: json });
        toast.success("Story uploaded successfully");
        setNewStory({ title: "", description: "", content: "" });
        setCoverImage(null);
        setEmptyFieldError("");
        setShowModal(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="text-center my-4">
        <Button variant="dark" onClick={handleOpenModal}>
          Upload Story
        </Button>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Story</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form>
            <Form.Group className="fw-bold" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter title"
                value={newStory.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="fw-bold" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter description"
                value={newStory.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="fw-bold" controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="content"
                placeholder="Enter content"
                value={newStory.content}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="fw-bold" controlId="formCoverImage">
              <Form.Label>Cover Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setCoverImage(e.target.files[0])}
              />
              <Form.Text className="text-muted">
                Recommended: 16:9 ratio (e.g. 1200×675px), at least 1000×600 px, under 1 MB.
              </Form.Text>
            </Form.Group>
            {emptyFieldError && (
              <Alert className="mt-2" variant="danger">
                {emptyFieldError}
              </Alert>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="dark " onClick={handleAddStory}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showPenNameModal} onHide={handleClosePenNameModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Pen Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPenName">
              <Form.Label>Pen Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your pen name"
                value={penName}
                onChange={(e) => setPenName(e.target.value)}
              />
            </Form.Group>
            {penNameError && (
              <Alert variant="danger" className="mt-2">
                {penNameError}
              </Alert>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePenNameModal}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handlePenNameSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default StoryForm;
