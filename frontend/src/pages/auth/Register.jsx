import React, { useState, Activity } from 'react'
import { useNavigate } from 'react-router'
import { useUsuariosService } from '../../services/usuarios.service'
import { useForm } from "react-hook-form"

const Register = () => {
  const navigate = useNavigate()
  const [errorRegistro, setErrorRegistro] = useState(null)
  const { registro } = useUsuariosService()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting }
  } = useForm()

  const email = watch("email", "")
  const pass = watch("pass", "")
  const passConfirm = watch("passConfirm", "")

  const validaciones = {
    longitudMin: pass.length >= 8,
    mayuscula: /[A-Z]/.test(pass),
    minuscula: /[a-z]/.test(pass),
    numero: /[0-9]/.test(pass),
    simbolo: /[@$!%*?&._-]/.test(pass)
  }

  const validacionConfirm = {
    igual: (pass === passConfirm) && pass.length > 0 && passConfirm.length > 0,
    longitudMin: passConfirm.length >= 8,
    mayuscula: /[A-Z]/.test(passConfirm),
    minuscula: /[a-z]/.test(passConfirm),
    numero: /[0-9]/.test(passConfirm),
    simbolo: /[@$!%*?&._-]/.test(passConfirm)
  }

  const isValidPass = Object.values(validaciones).every(value => value === true)
  const isValidPassConfirm = Object.values(validacionConfirm).every(value => value === true)

  const onSubmit = (formData) => {
    registro(formData.email, formData.pass, formData.passConfirm)
      .then(data => {
        navigate("/login")
      })
      .catch(err => {
        setErrorRegistro("No se pudo crear la cuenta o el email ya existe")
      })
  }

  const baseInputClass = 'w-full border rounded p-2 focus:outline-none focus:ring-2 transition-colors'
  
  const getEmailClass = () => {
    if (email.length === 0) return `${baseInputClass} border-gray-300 focus:ring-blue-500`
    return errors.email ? `${baseInputClass} border-red-500 focus:ring-red-500` : `${baseInputClass} border-green-500 focus:ring-green-500`
  }

  const getPassClass = () => {
    if (pass.length === 0) return `${baseInputClass} border-gray-300 focus:ring-blue-500`
    return !isValidPass ? `${baseInputClass} border-red-500 focus:ring-red-500` : `${baseInputClass} border-green-500 focus:ring-green-500`
  }

  const getPassConfirmClass = () => {
    if (passConfirm.length === 0) return `${baseInputClass} border-gray-300 focus:ring-blue-500`
    return !isValidPassConfirm ? `${baseInputClass} border-red-500 focus:ring-red-500` : `${baseInputClass} border-green-500 focus:ring-green-500`
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100 py-12' >
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-sm' >
        <h2 className='text-2xl font-bold text-center mb-6' >Registrar Cuenta</h2>
        
        {errorRegistro && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{errorRegistro}</div>}
        
        <form onSubmit={handleSubmit(onSubmit)} >
          {/* EMAIL */}
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-1 text-gray-700' >Email: </label>
            <input 
              type="email" 
              placeholder='Ingrese su correo' 
              className={getEmailClass()} 
              {...register("email", {
                required: "El campo email es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "No es un mail valido"
                }
              })} 
            />
            <Activity mode={errors?.email ? "visible" : "hidden"}>
              <p className="text-red-500 text-xs font-bold mt-1">
                {errors?.email?.message}
              </p>
            </Activity>
          </div>

          {/* PASSWORD */}
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-1 text-gray-700' >Contraseña: </label>
            <input 
              type="password" 
              placeholder='Ingrese su clave' 
              className={getPassClass()} 
              {...register("pass", {
                required: "El campo password es obligatorio",
                validate: value => {
                  if (value.length < 8) return "Debe tener al menos 8 Caracteres"
                  if (!/[A-Z]/.test(value)) return "Debe tener una mayuscula"
                  if (!/[a-z]/.test(value)) return "Debe tener una minuscula"
                  if (!/[0-9]/.test(value)) return "Debe tener al menos un numero"
                  if (!/[@$!%*?&._-]/.test(value)) return "Debe tener al menos un simbolo"
                  return true
                }
              })} 
            />
            <Activity mode={!isValidPass && pass.length > 0 ? "visible" : "hidden"}>
              <ul className='mt-2 space-y-1 text-xs font-bold' >
                <li className={validaciones.longitudMin ? "text-green-600" : "text-red-500"} >
                  {validaciones.longitudMin ? "✔" : "X"} Minimo 8 caracteres
                </li>
                <li className={validaciones.mayuscula ? "text-green-600" : "text-red-500"} >
                  {validaciones.mayuscula ? "✔" : "X"} Debe tener una mayuscula
                </li>
                <li className={validaciones.minuscula ? "text-green-600" : "text-red-500"} >
                  {validaciones.minuscula ? "✔" : "X"} Debe tener una minuscula
                </li>
                <li className={validaciones.numero ? "text-green-600" : "text-red-500"} >
                  {validaciones.numero ? "✔" : "X"} Debe tener al menos un numero
                </li>
                <li className={validaciones.simbolo ? "text-green-600" : "text-red-500"} >
                  {validaciones.simbolo ? "✔" : "X"} Debe tener al menos un simbolo
                </li>
              </ul>
            </Activity>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className='mb-6'>
            <label className='block text-sm font-semibold mb-1 text-gray-700' >Confirmar Contraseña: </label>
            <input 
              type="password" 
              placeholder='Repita su clave' 
              className={getPassConfirmClass()} 
              {...register("passConfirm", {
                required: "El campo password confirm es obligatorio",
                validate: value => {
                  if (value === pass) return true
                  if (value.length < 8) return "Debe tener al menos 8 Caracteres"
                  if (!/[A-Z]/.test(value)) return "Debe tener una mayuscula"
                  if (!/[a-z]/.test(value)) return "Debe tener una minuscula"
                  if (!/[0-9]/.test(value)) return "Debe tener al menos un numero"
                  if (!/[@$!%*?&._-]/.test(value)) return "Debe tener al menos un simbolo"
                  return "Las contraseñas no coinciden"
                }
              })} 
            />
            <Activity mode={!isValidPassConfirm && passConfirm.length > 0 ? "visible" : "hidden"}>
              <ul className='mt-2 space-y-1 text-xs font-bold' >
                <li className={validacionConfirm.igual ? "text-green-600" : "text-red-500"} >
                  {validacionConfirm.igual ? "✔" : "X"} Las contraseñas deben ser iguales
                </li>
                <li className={validacionConfirm.longitudMin ? "text-green-600" : "text-red-500"} >
                  {validacionConfirm.longitudMin ? "✔" : "X"} Minimo 8 caracteres
                </li>
                <li className={validacionConfirm.mayuscula ? "text-green-600" : "text-red-500"} >
                  {validacionConfirm.mayuscula ? "✔" : "X"} Debe tener una mayuscula
                </li>
                <li className={validacionConfirm.minuscula ? "text-green-600" : "text-red-500"} >
                  {validacionConfirm.minuscula ? "✔" : "X"} Debe tener una minuscula
                </li>
                <li className={validacionConfirm.numero ? "text-green-600" : "text-red-500"} >
                  {validacionConfirm.numero ? "✔" : "X"} Debe tener al menos un numero
                </li>
                <li className={validacionConfirm.simbolo ? "text-green-600" : "text-red-500"} >
                  {validacionConfirm.simbolo ? "✔" : "X"} Debe tener al menos un simbolo
                </li>
              </ul>
            </Activity>
          </div>

          <button 
            type='submit' 
            className={`w-full font-bold py-2 px-4 rounded transition-colors ${ 
              isValid
                ? "bg-green-600 hover:bg-green-700 text-white" 
                : "bg-gray-400 text-gray-200 cursor-not-allowed disabled" 
            }`} 
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
