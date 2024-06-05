import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { verificationCodeSchema } from "../../schema/verifyEmailForm";
import axiosInstance from "../../api/axiosInstance";

const EmailVerificationPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const formik = useFormik({
    initialValues: {
      verificationCode: null,
    },
    validationSchema: verificationCodeSchema,
    onSubmit: (values) => {
      try {
        axiosInstance.post(`/api/verify/${token}`, values).then((response) => {
          response.data.success && navigate("/");
        });
      } catch (error) {
        console.log("There is an error", error);
      }
    },
  });

  return (
    <>
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="my-3">
            <Card.Body>
              <div className="mb-4">
                <h4>
                  A verification code is sent to your email. Please check your
                  email and enter the code.
                </h4>
              </div>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                  <Form.Control
                    id="verificationCode"
                    name="verificationCode"
                    type="number"
                    placeholder="Enter verification code"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.verificationCode}
                  />
                  {formik.touched.verificationCode &&
                  formik.errors.verificationCode ? (
                    <div className="error-message">{formik.errors.code}</div>
                  ) : null}
                </Form.Group>
                <Form.Group className="d-flex justify-content-center mt-4">
                  <Button variant="outline-secondary" type="submit">
                    Submit
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

export default EmailVerificationPage;
