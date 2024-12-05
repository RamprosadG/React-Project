import * as yup from "yup";

export const verificationCodeSchema = yup.object().shape({
  verificationCode: yup.number().required("Required"),
});
