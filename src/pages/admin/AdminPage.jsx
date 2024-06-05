import React from "react";
import BlogTable from "../../components/Tables/BlogTable";
import { Link } from "react-router-dom";
import TopicTable from "../../components/Tables/TopicTable";
import { Button, Col, Row } from "react-bootstrap";

const AdminPage = () => {
  return (
    <>
      <div className="admin-page-style my-3 p-3">
        <Row className="justify-content-start mb-3">
          <Col xs="auto" className="mb-3">
            <Link to="/blog">
              <Button variant="outline-secondary">Add</Button>
            </Link>
          </Col>
          <Col xs="auto" className="mb-3">
            <Link to="/publish/blog">
              <Button variant="outline-secondary">Publish</Button>
            </Link>
          </Col>
          <Col xs="auto" className="mb-3">
            <Link to="/unpublish/blog">
              <Button variant="outline-secondary">Unpublish</Button>
            </Link>
          </Col>
        </Row>
        <div className="mb-3">
          <h1>Blog Table</h1>
        </div>
        <div>
          <BlogTable />
        </div>

        <div className="row justify-content-between mt-5">
          <div className="col">
            <h1>Topic list</h1>
          </div>
          <div className="col d-flex justify-content-end">
            <Link to="/topic">
              <button type="button" className="btn btn-outline-secondary">
                Add a topic
              </button>
            </Link>
          </div>
        </div>
        <div>
          <TopicTable />
        </div>
      </div>
    </>
  );
};

export default AdminPage;
