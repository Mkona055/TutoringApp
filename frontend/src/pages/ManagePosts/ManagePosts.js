import { useEffect, useState } from "react";
import { deletePostById, fetchPostById } from "../../utils/api";
import { Spinner } from "react-bootstrap";
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
  const { isAuthenticated, token } = useAuth();

  const handleSearch = (idToSearch) => {
    if (idToSearch) {
      setIdToSearch(idToSearch);
    }
  };

  const handleDelete = (id) => {
    deletePostById(id, token).then(
      (result) => {
        setIdToSearch(null);
      },
      (error) => {
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

  if (!isAuthenticated) {
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
