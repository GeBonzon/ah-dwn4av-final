import { useApi } from "./api.service";
/**
 * Servicio encargado de la comunicacion con la API para la entidad usuarios
 */
export const useUsuariosService = () => {
  const { call } = useApi();

  const login = (credenciales) => call("/usuarios/login", "POST", credenciales);
  
  const registro = (email, password, passwordConfirm) =>
    call("/usuarios", "POST", {
      email,
      password,
      passwordConfirm,
    });

  return { login, registro };
};
