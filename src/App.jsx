import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import HomePage from "./pages/common/HomePage";
import LoginPage from "./pages/common/LoginPage";
import RegisterPage from "./pages/common/RegisterPage";
import AdminPage from "./pages/admin/AdminPage";
import BlogPage from "./pages/protected/BlogPage";
import TopicPage from "./pages/protected/TopicPage";
import ErrorPage from "./pages/common/ErrorPage";
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "styled-components";
import "react-quill/dist/quill.snow.css";
import EmailVerificationPage from "./pages/common/EmailVerificationPage";
import AuthContext from "./context/authContext";
import Toastify from "./components/Toastify/Toastify";
import { ToastContainer } from "react-bootstrap";
import PublishBlogPage from "./pages/admin/PublishBlogPage";
import UnpublishBlogPage from "./pages/admin/UnpublishBlogPage";

const App = () => {
  const { showToast } = useContext(AuthContext);
  return (
    <div className="container">
      <BrowserRouter>
        {showToast && (
          <ToastContainer position="top-center">
            <Toastify value={true}></Toastify>
          </ToastContainer>
        )}
        <Header />
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/admin" Component={AdminPage} />
          <Route path="/blog/:id?" Component={BlogPage} />
          <Route path="/publish/blog" Component={PublishBlogPage} />
          <Route path="/unpublish/blog" Component={UnpublishBlogPage} />

          <Route path="/topic/:id?" Component={TopicPage} />
          <Route path="/verify/:token?" Component={EmailVerificationPage} />
          <Route path="*" Component={ErrorPage} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
