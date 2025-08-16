import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

export default function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null); // null = loading

  useEffect(() => {
    const validateToken = async () => {
      try {
        await axiosInstance.get("/api/auth/validate"); 
        setIsValid(true);
      } catch (error) {
        setIsValid(false);
      }
    };

    validateToken();
  }, []);

  if (isValid === null) {
    return <p>Loading...</p>; // Or a spinner
  }

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
}