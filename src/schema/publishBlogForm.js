import * as yup from "yup";

export const publishBlogSchema = yup.object().shape({
  blogId: yup.string().required("Required"),
});
