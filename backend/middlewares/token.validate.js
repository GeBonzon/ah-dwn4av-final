import { validateToken as validarToken } from "../services/token.service.js";

/**
 * Middleware para proteger rutas requiriendo un JWT válido.
 * Verifica la existencia del token y lo decodifica para guardarlo en la request.
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para continuar al siguiente middleware.
 * @returns {void}
 */
export function validateToken(req, res, next) {
  try {
    const auth = req.headers.authorization;
    console.log(auth.authorization);
    const [bearer, token] = auth.split(" ");

    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({ message: "token invalido" });
    }

    const usuario = validarToken(token);

    // Guarda al usuario en el request para que esté disponible en los siguientes middlewares/controladores
    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
}

/**
 * Middleware de autorización para requerir rol de Administrador verificando que el rol sea mayor o igual a 1
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para continuar al siguiente middleware.
 * @returns {void}
 */
export function validateRolAdmin(req, res, next) {
  // Obtiene el rol del usuario extraído por validateToken
  const rol = req.usuario.rol;

  if (rol >= 1) return next();
  return res.status(401).json({ message: "Usuario no autorizado (Nivel Admin requerido para continuar)" });
}

/**
 * Middleware de autorización para requerir rol de SuperAdmin verificando que el rol del usuario sea 2 o superior
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para continuar al siguiente middleware.
 * @returns {void}
 */
export function validateRolSuperAdmin(req, res, next) {
  const rol = req.usuario.rol;

  if (rol >= 2) return next();
  return res.status(401).json({ message: "Usuario no autorizado (Nivel SuperAdmin requerido para continuar)" });
}
