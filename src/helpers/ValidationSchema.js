import * as yup from "yup";

export const loginValidation = yup.object({
  user: yup
    .string("Introduzca su usuario")
    // .username("Introduzca un usuario válido")
    .required("Usuario requerido"),
  password: yup
    .string("Introduzca su contraseña")
    .min(10, "Contraseña debe tener un mínimo de 10 caracteres")
    .max(20, "Contraseña debe tener un máximo de 20 caracteres")
    .required("Contraseña requerida"),
});

export const registerValidation = yup.object({
  user: yup
    .string("Introduzca su usuario")
    // .username("Introduzca un usuario válido")
    .required("Usuario requerido"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Introduzca su contraseña")
    .min(10, "Contraseña debe tener un mínimo de 10 caracteres")
    .max(20, "Contraseña debe tener un máximo de 20 caracteres")
    .required("Contraseña requerida"),
});

export const clientValidation = yup.object({
  identification: yup
    .string("Introduzca la identificación")
    .required("Identificación requerida"),
  name: yup.string("Introduzca el nombre").required("Nombre requerido"),
  lastname: yup
    .string("Introduzca los apellidos")
    .required("Apellidos requerido"),
  gender: yup.string("Seleccione el género").required("Género requerido"),
  birthday: yup
    .string("Introduzca la fecha de nacimiento")
    .required("Fecha de nacimiento requerida"),
  afiliation: yup
    .string("Introduzca la fecha de afiliación")
    .required("Fecha de afiliación requerida"),
  cellphone: yup
    .string("Introduzca el teléfono celular")
    .required("Teléfono celular requerido"),
  otherphone: yup
    .string("Introduzca otro teléfono")
    .required("Otro teléfono requerido"),
  interest: yup.string("Seleccione el interés").required("Iterés requerido"),
  address: yup
    .string("Introduzca la dirección")
    .required("Dirección requerida"),
  review: yup.string("Introduzca la reseña").required("Reseña requerida"),
  // image: yup.string("Coloque una foto"),
});
