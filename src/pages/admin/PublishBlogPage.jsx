import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import axiosInstance from "../../api/axiosInstance";
import { publishBlogSchema } from "../../schema/publishBlogForm";
import { useNavigate } from "react-router-dom";

const PublishBlogPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUnpublishedBlog();
  }, []);

  const fetchUnpublishedBlog = () => {
    axiosInstance
      .get("/api/admin/blog/all/unpublish")
      .then((response) => {
        if (response.data.success) {
          setOptions(response.data.data);
        }
      })
      .catch(() => {
        console.log("server error");
      });
  };

  const formik = useFormik({
    initialValues: {
      blogId: "",
    },
    validationSchema: publishBlogSchema,
    onSubmit: (values) => {
      try {
        axiosInstance
          .patch(`/api/admin/blog/update/publish/${values.blogId}`)
          .then((response) => {
            if (response.data.success) {
              setErrorMessage("");
              alert(response.data.message);
              navigate("/admin");
            } else {
              setErrorMessage(response.data.message);
            }
          });
      } catch (error) {
        console.log("Error in publish blog: ", error);
      }
    },
  });

  return (
    <>
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title className="text-center mb-5">
                <h2>Publish Blog</h2>
              </Card.Title>
              {errorMessage && (
                <div className="error-message mb-2">{errorMessage}</div>
              )}
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Select blog</Form.Label>
                  <Form.Select
                    id="publishBlog"
                    name="blogId"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.blogId}
                  >
                    <option id="option" key={"option"} value={""}>
                      Select blog
                    </option>
                    {options?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.title}
                      </option>
                    ))}
                  </Form.Select>
                  {formik.touched.blogId && formik.errors.blogId ? (
                    <div className="error-message">{formik.errors.blogId}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="d-flex justify-content-between mt-3">
                  <div>
                    <Button variant="outline-secondary" type="submit">
                      Publish
                    </Button>
                  </div>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PublishBlogPage;
