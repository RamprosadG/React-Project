import { Button, Col, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useFormik } from "formik";
import { topicSchema } from "../../schema/topicForm";

const TopicPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setTopicValue();
    }
  }, []);

  const setTopicValue = () => {
    axiosInstance
      .get(`/api/admin/topic/single/${id}`)
      .then((response) => {
        if (response.data.success) {
          formik.setFieldValue("name", response.data.data.name);
        }
      })
      .catch(() => {
        console.log("Error to set topic.");
      });
  };

  const handleRedirectToAdminPage = () => {
    navigate("/admin");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: topicSchema,
    onSubmit: (values) => {
      !id ? handleAddTopic(values) : handleUpdateTopic(values);
    },
  });

  const handleAddTopic = (values) => {
    try {
      axiosInstance.post("/api/admin/topic/create", values).then((response) => {
        if (response.data.success) {
          alert(response.data.message);
          navigate("/admin");
        } else {
          setErrorMessage(response.data.message);
        }
      });
    } catch (error) {
      console.log("Error to add topic");
    }
  };

  const handleUpdateTopic = (values) => {
    try {
      axiosInstance
        .put(`/api/admin/topic/update/${id}`, values)
        .then((response) => {
          if (response.data.success) {
            alert(response.data.message);
            navigate("/admin");
          } else {
            setErrorMessage(response.data.message);
          }
        });
    } catch (error) {
      console.log("Error to upsate topic.");
    }
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title className="text-center">Topic</Card.Title>
              {errorMessage && (
                <div className="error-message mb-2">{errorMessage}</div>
              )}
              <Form className="my-3" onSubmit={formik.handleSubmit}>
                <Form.Group>
                  <Form.Label>Topic name</Form.Label>
                  <Form.Control
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="error-message">{formik.errors.name}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="d-flex justify-content-end mt-4">
                  <Button variant="outline-secondary" type="submit">
                    {id ? "Save changes" : "Submit"}
                  </Button>
                </Form.Group>

                <Form.Group>
                  <Button
                    variant="link"
                    className="ms-2"
                    onClick={handleRedirectToAdminPage}
                  >
                    Back to admin page
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TopicPage;
