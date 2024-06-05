import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import { useContext } from "react";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, userInfo, setUserInfo } =
    useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  return (
    <Navbar expand="md" className="header-style border mt-3">
      <Container>
        <div className="d-flex justify-content-start">
          <div className="me-4">
            <Link className="header-text-style" to="/">
              DYNAMIC BLOG
            </Link>
          </div>
          {isLoggedIn && userInfo.role == "admin" && (
            <div>
              <Link className="header-text-style" to="/admin">
                ADMIN
              </Link>
            </div>
          )}
        </div>
        <div className="d-flex justify-content-end">
          {!isLoggedIn ? (
            <Link to="/login">
              <Button variant="outline-secondary">Login</Button>
            </Link>
          ) : (
            <div className="d-flex justify-content-start header-text-style">
              <div className="me-2">{userInfo.username}</div>
              <div>
                <Button variant="outline-secondary" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
