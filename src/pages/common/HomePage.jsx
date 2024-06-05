import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Box from "@mui/material/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import ReactQuill from "react-quill";
import { Form } from "react-bootstrap";
import axiosInstance from "../../api/axiosInstance";

const HomePage = () => {
  const [sidebarData, setSidebarData] = useState([]);
  const [lastSelectedItem, setLastSelectedItem] = useState("");
  const [blogData, setBlogData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);

  useEffect(() => {
    fetchSidebarData();
  }, [searchText]);

  useEffect(() => {
    if (lastSelectedItem) {
      fetchBlogData();
    }
  }, [lastSelectedItem]);

  useEffect(() => {
    fetchPaginationData();
  }, [page]);

  const fetchPaginationData = () => {
    const formData = {
      page: page,
      pageSize: pageSize,
    };
    try {
      axiosInstance
        .get("/api/user/blog/pagination", {
          params: formData,
        })
        .then((response) => {
          //have to update later
        });
    } catch (error) {
      console.log("Eerror to fetch sidebar data");
    }
  };

  const fetchSidebarData = () => {
    const formData = {
      search: searchText,
    };
    try {
      axiosInstance
        .get("/api/user/sidebar", {
          params: formData,
        })
        .then((response) => {
          setSidebarData(response.data.data);
        });
    } catch (error) {
      console.log("Error to fetch sidebar data");
    }
  };

  const fetchBlogData = () => {
    try {
      axiosInstance
        .get(`/api/user/blog/single/${lastSelectedItem}`)
        .then((response) => {
          setBlogData(response.data.data);
        });
    } catch (error) {
      console.log("There is an error to fetch sidebar data");
    }
  };

  const handleItemSelectionToggle = (event, itemId, isSelected) => {
    const guid = new RegExp(
      /^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/
    );

    if (isSelected && guid.test(itemId)) {
      setLastSelectedItem(itemId);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const modules = {
    toolbar: false,
  };

  return (
    <>
      <div className="my-3">
        <Row>
          <Col md={3}>
            <Col className="home-page-sidebar pb-3">
              <div className="m-3">
                <Form.Control
                  type="search"
                  id="blog-search"
                  placeholder="Search blog"
                  value={searchText}
                  onChange={handleSearchChange}
                  className="home-page-search"
                />
              </div>
              <div>
                <Box>
                  <RichTreeView
                    items={sidebarData}
                    onItemSelectionToggle={handleItemSelectionToggle}
                  />
                </Box>
              </div>
            </Col>
          </Col>

          <Col md={9}>
            <Col className="home-page-blog">
              <div className="blog-title text-center mt-3">
                <h1>{blogData && blogData.title}</h1>
              </div>
              <div className="blog-description mt-5">
                {blogData && (
                  <ReactQuill
                    id="react-quill"
                    theme="snow"
                    value={blogData.description}
                    modules={modules}
                    readOnly={true}
                  />
                )}
              </div>
            </Col>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HomePage;
