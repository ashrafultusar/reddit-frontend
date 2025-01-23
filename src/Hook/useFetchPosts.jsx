import { useState, useEffect } from "react";
import axios from "axios";

const useFetchPosts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://backend-ten-indol-40.vercel.app/api/posts').then((response) => {
      setData(response.data);
    });
  }, []);

  return data;
};

export default useFetchPosts;
