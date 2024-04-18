import { useEffect, useState } from "react";
import { getUserDataFromId, deleteUserById } from "../../utils/api";
import { Spinner } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import NavbarComp from "../../components/NavbarComp/NavbarComp";
import PageTitle from "../../components/PageTitle/PageTitle";
import Search from "../../components/Search/Search";
import User from "../../components/User/User";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router";
function ManageUsers() {
  const [idToSearch, setIdToSearch] = useState(null);
  const [user, setUser] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, token } = useAuth();

  const handleSearch = (idToSearch) => {
    if (idToSearch) {
      setIdToSearch(idToSearch);
    }
  };

  const handleDelete = (userId) => {
    deleteUserById(userId, token).then(
      (result) => {
        setIdToSearch(null);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  useEffect(() => {
    if (isAuthenticated && idToSearch ) {
      getUserDataFromId(idToSearch, token).then(
        (result) => {
          setError(null);
          setUser(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(`Error fetching user: ${error}`);
        }
      );
    }else{
      setError(null);
      setIsLoaded(true);
    }
    // eslint-disable-next-line
  }, [idToSearch]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    if (error) {
      return <div>Error: {error.message}</div>;
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
          <PageTitle title={"Manage users"} />
          <Search type={"USER"} onSearch={handleSearch} />
          <div className="row g mb-5 ps-4 pe-4 pt-2 bg-white rounded-3 ms-5 mt-5 me-5 d-flex justify-content-center ">
            {user ? <User user={user} onDelete={handleDelete}/> : "No user found"}
          </div>
          <Footer />
        </>
      );
    }
  }
}

export default ManageUsers;
