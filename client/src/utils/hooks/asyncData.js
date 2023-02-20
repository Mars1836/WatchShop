import { useEffect, useState } from "react";

function useAsyncData(request) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    request
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  return [data, error, loading, setData];
}
export default useAsyncData;
