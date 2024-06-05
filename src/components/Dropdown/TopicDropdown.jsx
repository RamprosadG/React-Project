import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import axiosInstance from "../../api/axiosInstance";

const TopicDropdown = ({ formik }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/api/admin/topic/all")
      .then((response) => {
        setOptions(response.data.data);
      })
      .catch(() => {
        console.log("server error");
      });
  }, []);

  return (
    <Form.Select
      id="topicId"
      name="topicId"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.topicId}
    >
      <option id="option" key={"option"} value={""}>
        Select topic
      </option>
      {options?.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </Form.Select>
  );
};

export default TopicDropdown;
