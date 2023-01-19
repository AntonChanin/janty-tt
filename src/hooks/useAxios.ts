import axios from 'axios';
import { useState, useEffect } from 'react';

axios.defaults.baseURL = import.meta.env.VITE_AGRO_URL;

const useAxios = (query: string, dependency?: any[]) => {
  const [response, setResponse] = useState<Record<string, string | number>[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axios
      .get(query)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [...(dependency ?? [])]);

  return { response, error, loading };
};

export default useAxios;
