import * as yup from "yup";

export const topicSchema = yup.object().shape({
  name: yup.string().required("Required"),
});
