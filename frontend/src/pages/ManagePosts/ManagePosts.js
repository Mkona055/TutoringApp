import { useEffect, useState } from "react";
import { deletePostById, fetchPostById } from "../../utils/api";
import { Spinner, Alert } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import NavbarComp from "../../components/NavbarComp/NavbarComp";
import PageTitle from "../../components/PageTitle/PageTitle";
import Search from "../../components/Search/Search";
import Post from "../../components/Post/Post";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router";
function ManagePosts() {
  const [idToSearch, setIdToSearch] = useState();
  const [post, setPost] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const { isAuthenticated, token, authUser } = useAuth();

  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  const handleCloseErrorAlert = () => {
    setShowErrorAlert(false);
  };

  const handleSearch = (idToSearch) => {
    if (idToSearch) {
      setIdToSearch(idToSearch);
    }
  };

  const handleDelete = (id) => {
    deletePostById(id, token).then(
      (result) => {
        setShowSuccessAlert(true);
        setPost(null);
        setIdToSearch(null);
      },
      (error) => {
        setShowErrorAlert(true);
        console.log(error);
      }
    );
  }
  useEffect(() => {
    if (isAuthenticated && idToSearch) {
      fetchPostById(idToSearch, token).then(
        (result) => {
          setError(null);
          setPost(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(`Error fetching post: ${error}`);
        }
      );
    }else{
      setError(null);
      setIsLoaded(true);
    }
    console.log(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToSearch]);

  if (!isAuthenticated || authUser?.role !== "ADMIN") {
    return <Navigate to="/" />;
  } else {
    if (error) {
      return <div>Error: {error}</div>;
    } else if (!isLoaded) {
      return (
        <>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Spinner animation="border" />
          </div>
        </>
      );
    } else {
      return (
        <>
          <NavbarComp />
          <PageTitle title={"Manage posts"} />
          <div className="container mt-3 d-flex justify-content-center">
          <div className="w-50">
            <Alert
              show={showSuccessAlert}
              variant="success"
              onClose={handleCloseSuccessAlert}
              dismissible
            >
              <p>Your changes were saved successfully!</p>
            </Alert>
            <Alert
              show={showErrorAlert}
              variant="danger"
              onClose={handleCloseErrorAlert}
              dismissible
            >
              <p>An error occurred while saving your changes</p>
            </Alert>
          </div>
        </div>

          <Search type={"POST"} onSearch={handleSearch} />

          <div className="row g mb-5 ps-4 pe-4 pt-2 bg-white rounded-3 ms-5 mt-5 me-5 d-flex justify-content-center ">
            {post ? <Post post={post} allowDelete={true} onDelete={handleDelete}/> : "No post found"}
          </div>
          <Footer />
        </>
      );
    }
  }
}

export default ManagePosts;
