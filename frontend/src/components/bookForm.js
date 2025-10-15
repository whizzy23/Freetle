import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';

const BookForm = ({ onSuccess }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [bookFile, setBookFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [emptyFieldError, setEmptyFieldError] = useState('');

  const { user } = useAuthContext();

  const handleOpenModal = () => {
    setShowModal(true);
    setEmptyFieldError('');
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setTitle('');
    setDescription('');
    setPrice('');
    setBookFile(null);
    setCoverImage(null);
    setEmptyFieldError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !price || !bookFile) {
      setEmptyFieldError('All required fields must be filled');
      return;
    }

    const uploadBookNoti = toast.loading('Uploading book...');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('bookFile', bookFile);
      if (coverImage) formData.append('coverImage', coverImage);

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/books/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      // let parent handle updating context/UI
      if (typeof onSuccess === 'function') onSuccess(data);

      toast.update(uploadBookNoti, {
        render: 'Book uploaded successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 500,
      });

      handleCloseModal();
    } catch (err) {
      toast.update(uploadBookNoti, {
        render: err.message || 'Failed to upload book',
        type: 'error',
        isLoading: false,
        autoClose: 500,
      });
    }
  };

  return (
    <>
      <Button variant="dark" onClick={handleOpenModal}>
        Upload Book
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Book For Sale</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form>
            <Form.Group className="fw-bold">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="fw-bold">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="fw-bold">
              <Form.Label>Price (INR)</Form.Label>
              <Form.Control type="number" min={1} value={price} onChange={e => setPrice(e.target.value)} />
            </Form.Group>
            <Form.Group className="fw-bold">
              <Form.Label>Book File</Form.Label>
              <Form.Control type="file" accept=".pdf,.epub" onChange={e => setBookFile(e.target.files[0])} />
            </Form.Group>
            <Form.Group className="fw-bold">
              <Form.Label>Cover Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={e => setCoverImage(e.target.files[0])} />
            </Form.Group>

            {emptyFieldError && <Alert className="mt-2" variant="danger">{emptyFieldError}</Alert>}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleSubmit}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BookForm;
