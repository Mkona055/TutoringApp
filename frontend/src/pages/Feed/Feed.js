import "./Feed.css";
import { useEffect, useState } from "react";
import { fetchPostsWithParams, fetchTags } from "../../utils/api";
import { Spinner } from "react-bootstrap";
import Filter from "../../components/Filter/Filter";
import Footer from "../../components/Footer/Footer";
import NavbarComp from "../../components/NavbarComp/NavbarComp";
import PostList from "../../components/PostList/PostList";
function Feed() {
  const [params, setParams] = useState();
  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  function handleFilterSelection(params) {
    setParams(params);
  }
  useEffect(() => {
    fetchTags()
    .then((tags) => {
      setTags(tags);
    });

    fetchPostsWithParams(params)
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
  }, [params]);

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
        <Filter onFilter={handleFilterSelection} tags={tags} />
        <div className="apartment-list ps-4 pe-4 pt-2 bg-white rounded-3 ms-5 mt-5 me-5">
          <PostList posts={posts} />
        </div>
        <Footer />
      </>
    );
  }
}

export default Feed;
