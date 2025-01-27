import { useState, useEffect } from "react";
import axios from "axios";

const useAllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios("http://localhost:8000/api/auth/users");
        setUsers(response?.data); 
        setLoading(false); 
      } catch (err) {
        setError(err.message); 
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); 

  return { users, loading, error }; 
};

export default useAllUser;
