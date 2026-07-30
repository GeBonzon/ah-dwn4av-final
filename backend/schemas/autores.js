import yup from "yup";

export const autoresSchema = yup.object({
  nombre: yup.string().required("El campo nombre es requerido"),
  slug: yup.string().required("El campo slug es requerido"),
});
