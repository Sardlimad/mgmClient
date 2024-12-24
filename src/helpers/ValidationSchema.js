import * as yup from "yup";

export const loginValidation = yup.object({
  user: yup
    .string("Introduzca su usuario")
    // .username("Introduzca un usuario válido")
    .required("Usuario requerido"),
  password: yup
    .string("Introduzca su contraseña")
    // .min(10, "Contraseña debe tener un mínimo de 10 caracteres")
    // .max(20, "Contraseña debe tener un máximo de 20 caracteres").matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
    // .matches(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
    // .matches(/[0-9]/, "La contraseña debe contener al menos un número")
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
    .matches(
      /[A-Z]/,
      "La contraseña debe contener al menos una letra mayúscula"
    )
    .matches(
      /[a-z]/,
      "La contraseña debe contener al menos una letra minúscula"
    )
    .matches(/[0-9]/, "La contraseña debe contener al menos un número")
    .required("Contraseña requerida"),
});

export const clientValidation = yup.object({
  identification: yup
    .string("Introduzca la identificación")
    .matches(/^[0-9A-Za-z-]+$/, "La identificación no es válida")
    .required("Identificación requerida"),

  name: yup
    .string("Introduzca el nombre")
    .matches(
      /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/,
      "El nombre solo puede contener letras"
    )
    .required("Nombre requerido"),

  lastname: yup
    .string("Introduzca los apellidos")
    .matches(
      /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/,
      "Los apellidos solo pueden contener letras"
    )
    .required("Apellidos requeridos"),

  gender: yup.string("Seleccione el género").required("Género requerido"),

  birthday: yup
    .date("Introduzca una fecha válida")
    .max(new Date(), "La fecha de nacimiento no puede ser futura")
    .required("Fecha de nacimiento requerida"),

  afiliation: yup
    .date("Introduzca una fecha válida")
    .max(new Date(), "La fecha de afiliación no puede ser futura")
    .required("Fecha de afiliación requerida"),

  cellphone: yup
    .string("Introduzca el teléfono celular")
    .matches(
      /^[0-9]{8,15}$/,
      "El teléfono celular debe contener entre 8 y 15 dígitos"
    )
    .required("Teléfono celular requerido"),

  otherphone: yup
    .string("Introduzca otro teléfono")
    .matches(
      /^[0-9]{8,15}$/,
      "El otro teléfono debe contener entre 8 y 15 dígitos"
    )
    .required("Otro teléfono requerido"),

  interest: yup.string("Seleccione el interés").required("Interés requerido"),

  address: yup
    .string("Introduzca la dirección")
    .min(5, "La dirección debe contener al menos 5 caracteres")
    .max(100, "La dirección no puede exceder los 100 caracteres")
    .required("Dirección requerida"),

  review: yup
    .string("Introduzca la reseña")
    .min(10, "La reseña debe contener al menos 10 caracteres")
    .max(500, "La reseña no puede exceder los 500 caracteres")
    .required("Reseña requerida"),

  // Si deseas incluir una imagen, valida su formato:
  image: yup
    .mixed()
    .test("fileType", "Solo se permiten imágenes (jpg, png)", (value) =>
      value ? ["image/jpeg", "image/png"].includes(value.type) : true
    )
    .notRequired(),
});
