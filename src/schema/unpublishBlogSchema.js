import * as yup from "yup";

export const unpublishBlogSchema = yup.object().shape({
  blogId: yup.string().required("Required"),
});
