import React, { Activity } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { useUsuariosService } from "../../services/usuarios.service";
import { useLogin } from "../../contexts/Session.context";
import { useForm } from "react-hook-form"

const Login = () => {
  const navigate = useNavigate()
  const { login } = useUsuariosService();
  const onLogin = useLogin();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ mode: "onChange" })

  const email = watch("email", "")
  const pass = watch("pass", "")

  const onSubmit = (formData) => {
    login({ email: formData.email, password: formData.pass })
      .then(data => {
        onLogin(data.token, formData.email);
        toast.success("¡Bienvenido de nuevo!");
        navigate("/catalogo");
      })
      .catch(err => {
        toast.error("Credenciales incorrectas");
      })
  }

  const baseInputClass = 'w-full border rounded p-2 focus:outline-none focus:ring-2 transition-colors'
  const getInputClass = (fieldValue, error) => {
    if (!fieldValue || fieldValue.length === 0) return `${baseInputClass} border-gray-300 focus:ring-blue-500`
    if (error) return `${baseInputClass} border-red-500 focus:ring-red-500`
    return `${baseInputClass} border-green-500 focus:ring-green-500`
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100' >
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-sm' >
        <h2 className='text-2xl font-bold text-center mb-6' >Iniciar sesión</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-1 text-gray-700' >Email: </label>
            <input 
              type="email" 
              placeholder='Ingrese su correo' 
              className={getInputClass(email, errors.email)}
              {...register("email", {
                required: "El campo email es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "No es un mail valido"
                }
              })} 
            />
            <Activity mode={errors?.email ? "visible" : "hidden"}>
              <p className="text-red-500 text-xs font-bold mt-1">{errors?.email?.message}</p>
            </Activity>
          </div>
          <div className='mb-6'>
            <label className='block text-sm font-semibold mb-1 text-gray-700' >Contraseña: </label>
            <input 
              type="password" 
              placeholder='Ingrese su clave' 
              className={getInputClass(pass, errors.pass)}
              {...register("pass", {
                required: "El campo contraseña es obligatorio",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-]).{8,}$/,
                  message: "No es una contraseña valida"
                }
              })} 
            />
            <Activity mode={errors?.pass ? "visible" : "hidden"}>
              <p className="text-red-500 text-xs font-bold mt-1">{errors?.pass?.message}</p>
            </Activity>
          </div>
          <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors' >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
