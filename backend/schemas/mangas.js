import yup from "yup";

export const mangasSchema = yup.object({
  nombre: yup.string().required("El campo titulo es requerido"),
  descripcion: yup.string().required("El campo descripción es requerido"),
  portada: yup.string().optional(),
  categoria: yup.string().required("El campo categoria es requerido"),
  genero: yup.string().required("El campo genero es requerido"),
  autor: yup.string().required("El campo autor es requerido"),
  tipo: yup.string().required("El campo tipo es requerido"),
  total_volumenes: yup.number().integer().positive().nullable().optional(),
  leer: yup.string().url("Debe ser una URL válida").required("El campo donde leer el manga es requerido"),
  estado_lectura: yup.string().optional(),
  borrado: yup.boolean().optional(),
});
