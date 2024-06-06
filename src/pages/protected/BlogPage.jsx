import { Button, Col, Row } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { Card, Form } from "react-bootstrap";
import TopicDropdown from "../../components/Dropdown/TopicDropdown";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/authContext";
import axiosInstance from "../../api/axiosInstance";
import { Field, useFormik } from "formik";
import { blogSchema } from "../../schema/blogForm";
import ReactQuill from "react-quill";

const BlogPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userInfo } = useContext(AuthContext);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      setBlogValue();
    }
  }, []);

  useEffect(() => {
    formik.setFieldValue("description", content);
  }, [content]);

  const setBlogValue = () => {
    axiosInstance
      .get(`/api/admin/blog/single/${id}`)
      .then((response) => {
        if (response.data.success) {
          formik.setFieldValue("topicId", response.data.data.topicId);
          formik.setFieldValue("title", response.data.data.title);
          setContent(response.data.data.description);
        }
      })
      .catch(() => {
        console.log("server error");
      });
  };

  const handleRedirectToAdminPage = () => {
    navigate("/admin");
  };

  const formik = useFormik({
    initialValues: {
      topicId: "",
      title: "",
      description: "",
    },
    validationSchema: blogSchema,
    onSubmit: (values) => {
      !id ? handleAddBlog(values) : handleUpdateBlog(values);
    },
  });

  const handleAddBlog = (values) => {
    try {
      values.userId = userInfo.id;
      axiosInstance.post("/api/admin/blog/create", values).then((response) => {
        alert(response.data.message);
        response.data.success && navigate("/admin");
      });
    } catch (error) {
      console.log("Error in add blog.");
    }
  };

  const handleUpdateBlog = (values) => {
    try {
      axiosInstance
        .put(`/api/admin/blog/update/${id}`, values)
        .then((response) => {
          alert(response.data.message);
          response.data.success && navigate("/admin");
        });
    } catch (error) {
      console.log("Error in update blog.");
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6] }, { size: [] }, { font: [] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ align: [] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ script: "sub" }, { script: "super" }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "align",
    "color",
    "background",
    "script",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <>
      <div className="blog-page my-3">
        <Card>
          <Card.Body>
            <Card.Title className="text-center mb-4">Blog</Card.Title>
            <Form onSubmit={formik.handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Select topic</Form.Label>
                    <TopicDropdown formik={formik} />
                    {formik.touched.topicId && formik.errors.topicId ? (
                      <div className="error-message">
                        {formik.errors.topicId}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Blog title</Form.Label>
                    <Form.Control
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Enter title"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.title}
                    />
                    {formik.touched.title && formik.errors.title ? (
                      <div className="error-message">{formik.errors.title}</div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>
              <Row className="my-3">
                <Form.Group>
                  <ReactQuill
                    id="react-quill"
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    placeholder="Write your blog..."
                  />

                  {formik.touched.description && formik.errors.description ? (
                    <div className="error-message">
                      {formik.errors.description}
                    </div>
                  ) : null}
                </Form.Group>
              </Row>
              <Row>
                <Col className="d-flex justify-content-end mt-2">
                  <Button variant="outline-secondary" type="submit">
                    {id ? "Save changes" : "Submit"}
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-start">
                  <Button
                    variant="link"
                    className="ms-2"
                    onClick={handleRedirectToAdminPage}
                  >
                    Back to admin page
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default BlogPage;
