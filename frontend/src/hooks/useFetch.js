import { useEffect, useState, useMemo } from "react";

export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);

  // Memorizar las opciones para evitar renders innecesarios
  const memoizedOptions = useMemo(() => options, [JSON.stringify(options)]);

  useEffect(() => {
    if (!url) {
      throw new Error("URL is required");
    }

    const abortController = new AbortController();
    setController(abortController);
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          ...memoizedOptions,
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url, memoizedOptions]);

  // Función para cancelar la solicitud
  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setError("Request canceled");
    }
  };

  return { data, loading, error, handleCancelRequest };
}
