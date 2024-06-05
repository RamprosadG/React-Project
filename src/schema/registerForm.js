import * as yup from "yup";

export const registerSchema = yup.object().shape({
  username: yup.string().required("Required"),
  email: yup.string().required("Required").email("Invalid email"),
  password: yup
    .string()
    .required("Required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d!]{8,}$/,
      "Password must contain at least one number and one letter"
    ),
});
