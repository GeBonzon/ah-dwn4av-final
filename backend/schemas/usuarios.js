import yup from "yup"

export const loginSchema = yup.object({
    email: yup.string().email().typeError("Debe ser un mail válido").required("El email es requerido"),
    password: yup.string().required("La contraseña es requerida")
})

export const registerSchema = yup.object({
    email: yup.string().email().typeError("Debe ser un mail válido").required("El email es requerido"),
    password: yup.string().required("La contraseña es requerida")
                .min(8, "La contraseña debe tener al menos 8 caracteres")
                .matches(/[0-9]/, "La contraseña debe tener al menos un número")
                .matches(/[A-Z]/, "La contraseña debe tener al menos una mayúscula")
                .matches(/[a-z]/, "La contraseña debe tener al menos una minúscula")
                .matches(/[@!$%&?=]/, "La contraseña debe tener al menos un caracter especial"),
    passwordConfirm: yup.string().oneOf([ yup.ref("password") ], "Las contraseñas deben ser iguales").required("La confirmación de contraseña es requerida")
})
