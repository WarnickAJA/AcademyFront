import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);

  useEffect(() => {
    // Para cancelar la solicitud cuando se desmonte el componente
    const abortController = new AbortController();
    setController(abortController);
    setLoading(true);
    fetch(url, { signal: abortController.signal })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => {
        if (error.name !== "AbortError") setError(error);
      })
      .finally(() => setLoading(false));

    return () => abortController.abort();
  }, [url]);

  // Función para cancelar la solicitud, podemos crear un boton para cancelar
  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setError("Request canceled");
    }
  };

  return { data, loading, error, handleCancelRequest };
}
