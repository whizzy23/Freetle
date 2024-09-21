import { useState , useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useUserContext } from '../hooks/useUserContext';
import { useAuthContext } from '../hooks/useAuthContext';
import ReCAPTCHA from 'react-google-recaptcha';
import {toast} from 'react-toastify';

const PurchasePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userData , dispatchUser } = useUserContext();
  const { user } = useAuthContext();

  const books = [
    { id: 'book1', title: 'Eminence in shadow', price: 100 },
    { id: 'book2', title: `Frieren: Beyond Journey's End`, price: 100 },
    { id: 'book3', title: 'Deranged Detective', price: 100 },
  ];

  // Handle Payment Function
  const handlePayment = async () => {
    if (!captchaVerified) {
      toast.error('Please verify the CAPTCHA');
      return;
    }

    if (!selectedBook) {
      toast.error('Please select a book to purchase');
      return;
    }

    setLoading(true);
    const selectedBookData = books.find(book => book.id === selectedBook);

    try {
      // Create an order in the backend
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/createOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: selectedBookData.price,
        }),
      });

      const data = await res.json();
      handlePaymentVerify(data.data);
    } catch (error) {
      console.error('Payment Error:', error.message);
      toast.error('Payment could not be processed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Payment Verification
  const handlePaymentVerify = (data) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: 'INR',
      name: 'E-Book Purchase',
      description: `Purchasing ${books.find(book => book.id === selectedBook).title}`,
      order_id: data.id,
      prefill: {
        name: name,
        email: email,
      },
      handler: async (response) => {
        try {
          const verifyRes = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/verifyPayment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.message) {
            toast.success('Payment successful!');
          } else {
            toast.error('Payment verification failed');
          }
        } catch (error) {
          console.error('Verification Error:', error.message);
          toast.error('Payment verification failed');
        }
      },
      theme: {
        color: '#5f63b8',
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  // CAPTCHA Change Handler
  const onCaptchaChange = (value) => {
    if (value) {
        setCaptchaVerified(true);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/details`, {
          headers: { 'Authorization': `Bearer ${user.token}` },
        });
        const json = await response.json();
        if (!response.ok) throw new Error(json.error);
        dispatchUser({ type: 'SET_USER', payload: json });
      }
      catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    }
    if (user) {
      fetchUserDetails();
    }
  } , [dispatchUser,user]);

  return (
    <div className="container mt-5">
      <Card className="p-4 shadow-sm">
        <h2 className="mb-3">Purchase E-Book</h2>
        <Form>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={'Enter your name'}
              value={userData.name}
              readOnly
            />
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={userData.email}
              readOnly
            />
          </Form.Group>

          <Form.Group controlId="book" className="mb-3">
            <Form.Label>Select a Book</Form.Label>
            <Form.Control
              as="select"
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              required
            >
              <option value="">Select a book</option>
              {books.map(book => (
                <option key={book.id} value={book.id}>
                  {book.title} - ₹{book.price}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* reCAPTCHA */}
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
            onChange={onCaptchaChange}
            className='py-2'
          />

          <Button
            variant="dark"
            className="mt-3"
            disabled={loading || !captchaVerified}
            onClick={handlePayment}
          >
            {loading ? 'Processing...' : `Pay ₹${selectedBook ? books.find(b => b.id === selectedBook)?.price : '...'}`}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default PurchasePage;
