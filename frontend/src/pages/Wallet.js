import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Spinner, Badge } from "react-bootstrap";

const Wallet = () => {
  const { user } = useAuthContext();
  const [wallet, setWallet] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/user/wallet`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();
        if (!response.ok) throw new Error(json.error);
        setWallet(json.wallet);
      } catch (error) {
        console.error("Error fetching wallet:", error.message);
      }
    };

    const fetchHistory = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/user/wallet/history`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();
        if (!response.ok) throw new Error(json.error);
        setHistory(json.history || []);
      } catch (error) {
        console.error("Error fetching wallet history:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchWallet();
      fetchHistory();
    }
  }, [user]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold text-center">Wallet</h2>

      {/* Wallet Balance Card */}
      <div className="wallet-balance-card shadow-lg text-center py-3 px-4 mb-4">
        <span className="fw-bold">Balance: </span>
        <span className="text-success fs-4">
          ₹{wallet !== null ? wallet : "..."}
        </span>
      </div>

      {/* Earnings History */}
      <h4 className="fw-semibold mb-3">Earnings History</h4>
      {loading ? (
        <div className="text-center py-4">
          <Spinner animation="border" />{" "}
          <p className="mt-2">Loading earnings...</p>
        </div>
      ) : history.length === 0 ? (
        <div className="text-muted text-center py-3">No earnings yet.</div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {history.map((item) => (
            <div
              key={item.bookId}
              className="earn-card p-3 shadow-lg d-flex justify-content-between align-items-center"
            >
              <div>
                <div className="fw-semibold">{item.title}</div>
                <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                  ₹{item.price} ×{" "}
                  <Badge bg="info" pill>
                    {item.timesPurchased}
                  </Badge>
                </div>
              </div>

              <div className="text-success fw-bold fs-5">
                ₹{item.totalEarned}
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        className="mt-5 text-center text-muted"
        style={{ fontSize: "1.1rem" }}
      >
        More features coming soon!
      </div>
    </div>
  );
};

export default Wallet;
