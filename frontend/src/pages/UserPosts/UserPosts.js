import { useEffect, useState } from "react";
import { fetchPostsFrom, fetchTags } from "../../utils/api";
import { Spinner } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import NavbarComp from "../../components/NavbarComp/NavbarComp";
import EditablePostList from "../../components/EditablePostList/EditablePostList";
import PageTitle from "../../components/PageTitle/PageTitle";
function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const userID = 1;
 
  useEffect(() => {
    fetchTags()
    .then((tags) => {
      setTags(tags);
    });

    fetchPostsFrom(userID)
    .then(
      (result) => {
        setPosts(result);
        setIsLoaded(true);
      },
      (error) => {
        setIsLoaded(true);
        setError(`Error fetching posts: ${error}`);
      }
    );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" variant="danger" />
        </div>
      </>
    );
  } else {
    return (
      <>
        <NavbarComp />
        <PageTitle title={"My posts"}/>
        <div className="ps-4 pe-4 pt-2 bg-white rounded-3 ms-5 mt-5 me-5">
          <EditablePostList posts={posts} tags={tags}/>
        </div>
        <Footer />
      </>
    );
  }
}

export default UserPosts;
