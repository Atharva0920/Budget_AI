import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

export default function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsValid(false);
      return;
    }

    axiosInstance.get("/api/auth/validate", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => setIsValid(true))
    .catch(() => setIsValid(false));
  }, []);

  if (isValid === null) return <div>Loading...</div>;
  if (!isValid) return <Navigate to="/login" replace />;

  return children;
}
