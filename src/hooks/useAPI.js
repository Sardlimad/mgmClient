import { useState } from "react";
import axios from "axios";
import { useAuth } from "../helpers/AuthProvider";

const useApi = () => {
  const baseUrl = "https://pruebareactjs.test-class.com/Api/api/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authData } = useAuth();

  const request = async (endpoint, method = "GET", data = null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        url: `${baseUrl}${endpoint}`,
        method,
        data,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            authData && authData.token ? `Bearer ${authData.token}` : "",
        },
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error en la solicitud");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
};

export default useApi;
