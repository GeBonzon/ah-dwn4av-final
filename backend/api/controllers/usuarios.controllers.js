import * as services from "../../services/usuarios.services.js";

export function createUser(req, res) {
  return services
    .createUser(req.body)
    .then((usuario) => res.status(201).json(usuario))
    .catch((err) => res.status(500).json(err));
}

export function login(req, res) {
  return services
    .login(req.body)
    .then((usuario) => res.status(200).json(usuario))
    .catch((err) => res.status(400).json({ message: "Usuario o contraseña incorrectos" }));
}

export function getUsuarios(req, res) {
  services
    .getUsuarios()
    .then((usuarios) => res.status(200).json(usuarios))
    .catch((err) => res.status(500).json(err));
}

export function asignarRol(req, res) {
  const { idUsuario } = req.params;
  const { rol } = req.body;

  services
    .asignarRol(idUsuario, rol)
    .then((usuario) => res.status(200).json(usuario))
    .catch((err) => res.status(500).json(err));
}
