import { useState, useEffect } from "react";
import axios from "axios";

const useAllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios("http://localhost:8000/api/auth/users");
        setUsers(response?.data); // Set users data
        setLoading(false); // Stop loading
      } catch (err) {
        setError(err.message); // Set error if any
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Dependency array is empty, so it runs only once

  return { users, loading, error }; // Return necessary states
};

export default useAllUser;
