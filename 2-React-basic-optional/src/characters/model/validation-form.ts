import { Validators, createFormValidation } from "@lemoncode/fonk";
const validationSchema = {
    field: {
      name: [
        { validator: Validators.required, message: "Debes indicar un nombre" },
      ],
    },
  };
  export const formValidation = createFormValidation(validationSchema)