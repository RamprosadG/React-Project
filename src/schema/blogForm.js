import * as yup from "yup";

export const blogSchema = yup.object().shape({
  topicId: yup.string().required("Required"),
  title: yup.string().required("Required"),
  description: yup
    .string()
    .required("Required")
    .notOneOf(["", "<p><br></p>"], "Required"),
});
