import { useState, useEffect } from "react";
import axios from "axios";

const useFetchPosts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/posts").then((response) => {
      setData(response.data);
    });
  }, []);

  return data;
};

export default useFetchPosts;
