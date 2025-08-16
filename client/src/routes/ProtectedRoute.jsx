import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsValid(false);
      return;
    }

    axios.get("http://localhost:8080/api/auth/validate", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => setIsValid(true))
    .catch(() => setIsValid(false));
  }, []);

  if (isValid === null) return <div>Loading...</div>;
  if (!isValid) return <Navigate to="/login" replace />;

  return children;
}
