import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const Session = createContext();

export function useSession() {
  return useContext(Session);
}

export function useEmail() {
  const { email } = useSession();
  return email;
}

export function useLogin() {
  const { onLogin } = useSession();
  return onLogin;
}

export function useLogout() {
  const { onLogout } = useSession();
  return onLogout;
}

export function useToken() {
  const { token } = useSession();
  return token;
}

/**
 * Extrae el token, lo decodifica y devuelve el rol
 * Si falla la decodificación o no hay token, asume que es un usuario comun
 * @returns {number} El nivel de rol del usuario (0, 1 o 2)
 */
export function useRol(){
    const token = useToken()
    try {
        const payload = jwtDecode(token)
        return payload?.rol || 0
    } catch (error) {
        return 0
    }
}

/**
 * Componente SessionProvider.
 * Envuelve a la aplicación y provee el estado global de autenticación, administra la sesión y token en localStorage
 */
export function SessionProvider({ children }) {
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem("session"))?.usuario || null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const onLogin = (jwt, usuario) => {
    localStorage.setItem("session", JSON.stringify({ usuario }));
    localStorage.setItem("token", jwt);
    setEmail(usuario);
    setToken(jwt);
  };

  const onLogout = () => {
    localStorage.clear();
    setEmail(null);
    setToken(null);
  };

  return (
    <Session.Provider value={{ email, token, onLogin, onLogout }}>
      {children}
    </Session.Provider>
  );
}
