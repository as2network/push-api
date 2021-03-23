/** 
* @file Validation 
* @summary Spanish Error Messages 
*/
import { checkSchema } from 'express-validator'

export const LoginSchema = checkSchema({
  email: {
    isEmail: {
      errorMessage: 'Debe ser un correo electronico',
    },
    isLength: { options: { max: 50, min: 7 }, errorMessage: "El correo electronico tiene que tener mas de 7 caracteres" },
    errorMessage: "El email no puede estar vacio"
  },
  password: {
    errorMessage: "La contraseña no puede estar vacia",
    isLength: { options: { min: 5 }, errorMessage: "La contraseña tiene que tener mas de 5 caracteres" }
  }
})

export const RegisterSchema = checkSchema({
  email: {
    isEmail: {
      errorMessage: 'Debe ser un correo electronico',
    },
    isLength: { options: { max: 50, min: 7 }, errorMessage: "El correo electronico tiene que tener mas de 7 caracteres" },
    errorMessage: "El email no puede estar vacio"
  },
  firstname: {
    errorMessage: "El nombre es requerido",
    isString: {
      errorMessage: "Solo se aceptan letras"
    },
    isLength: {
      options:{min: 3}, errorMessage:"El nombre tiene que tener mas de 3 caracteres"
    }
  },
  lastname: {
    errorMessage: "El lastname es requerido",
    isString: {
      errorMessage: "Solo se aceptan letras"
    },
    isLength: {
      options:{min: 3}, errorMessage:"El lastname tiene que tener mas de 3 caracteres"
    }
  },
  password: {
    errorMessage: "La contraseña no puede estar vacia",
    isLength: { options: { min: 5 }, errorMessage: "La contraseña tiene que tener mas de 5 caracteres" }
  }
})
