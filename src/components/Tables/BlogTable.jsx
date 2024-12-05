import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import TopicDropdown from "../Dropdown/TopicDropdown";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import TableCustomStyles from "./TableCustomStyles";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useFormik } from "formik";

const BlogTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [paginationTotalRows, setPaginationTotalRows] = useState(10);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData(formik.values);
  }, [currentPage, paginationTotalRows, sortColumn, sortDirection, search]);

  const formik = useFormik({
    initialValues: {
      topicId: "",
      startDate: "",
      endDate: "",
      status: "",
    },
    onSubmit: (values) => {
      fetchData(values);
    },
  });

  const fetchData = (values) => {
    try {
      setLoading(true);
      axiosInstance
        .get("/api/admin/blog/table", {
          params: {
            ...values,
            page: currentPage,
            row: paginationTotalRows,
            sortCol: sortColumn,
            sortDir: sortDirection,
            search: search,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setData(response.data.data);
            setTotalRows(response.data.totalRows);
          }
          setLoading(false);
        });
    } catch (error) {
      console.log("Error to fetch blogs");
      setLoading(false);
    }
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = async (newPerPage) => {
    setPaginationTotalRows(newPerPage);
  };

  const handleSort = (column, direction) => {
    setSortColumn(column.sortField);
    setSortDirection(direction);
  };

  const handleSearchChandge = (e) => {
    setSearch(e.target.value);
  };

  const handleDeleteBlog = (id) => {
    axiosInstance
      .delete(`/api/admin/blog/remove/${id}`)
      .then((response) => {
        alert(response.data.message);
        response.data.success && fetchData();
      })
      .catch(() => {
        console.log("server error");
      });
  };

  const columnsOfBlog = [
    {
      name: "Title",
      sortField: "title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Topic",
      sortField: "name",
      selector: (row) => row.topic,
      sortable: true,
    },
    {
      name: "Author",
      sortField: "username",
      selector: (row) => row.author,
      sortable: true,
    },
    {
      name: "Date",
      sortField: "createdAt",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "status",
      sortField: "status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Publish date",
      sortField: "publishDate",
      selector: (row) => row.publishDate,
      sortable: true,
    },
    {
      sortable: false,
      width: "100px",
      cell: (row) => {
        return (
          <div className="container ms-2">
            <div className="d-flex justify-content-start">
              <Link to={`/blog/${row.id}`}>
                <button type="button" className="btn btn-secondary, btn-sm">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </Link>
              <button
                type="button"
                className="btn btn-secondary, btn-sm"
                onClick={() => {
                  handleDeleteBlog(row.id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col xs={12} sm={6} md={2}>
            <Form.Label>Topic</Form.Label>
            <TopicDropdown formik={formik} />
          </Col>
          <Col xs={12} sm={6} md={2}>
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              id="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
            >
              <option id="status" key="status" value="">
                Select status
              </option>
              <option key="published" value={true}>
                Published
              </option>
              <option key="not-published" value={false}>
                Not published
              </option>
            </Form.Select>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Form.Group>
              <Form.Label>Start date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="startDate"
                id="startDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.startDate}
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Form.Group>
              <Form.Label>End date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="endDate"
                id="endDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endDate}
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={2}>
            <div className="table-button-generate">
              <Button variant="outline-secondary" type="submit">
                Generate
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mt-5 mb-2">
          <Col xs={6} sm={3}>
            <Form.Control
              type="search"
              name="serach"
              id="search"
              placeholder="Search"
              onChange={handleSearchChandge}
              value={search}
            />
          </Col>
        </Row>
      </Form>
      <DataTable
        id="blog-table"
        striped={true}
        highlightOnHover={true}
        columns={columnsOfBlog}
        data={data}
        customStyles={TableCustomStyles}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        onChangeRowsPerPage={handleRowsPerPageChange}
        onChangePage={handlePageChange}
        sortServer
        onSort={handleSort}
      />
    </>
  );
};

export default BlogTable;
