import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().required("Required").email("Invalid email"),
  password: yup.string().required("Required"),
});
