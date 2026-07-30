import { useNavigate } from "react-router";
import { useToken } from "../contexts/Session.context";

export function useApi() {
  const token = useToken();
  const navigate = useNavigate();

  const call = (uri, method, body) => {
    const isFormData = body instanceof FormData;

    const headers = {
      "Authorization": `Bearer ${token}`
    };

    // Si NO es FormData (es un objeto normal), le decimos que es JSON
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    return fetch(import.meta.env.VITE_API_URL + "/api" + uri, {
      method: method,
      headers: headers,
      body: isFormData ? body : JSON.stringify(body),
    }).then((res) => {
      if (res.ok) return res.json();
      if (res.status == 401) navigate("/login");
      throw new Error("Error en la petición API");
    });
  };

  return { call };
}
