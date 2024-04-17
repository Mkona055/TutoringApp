import { useEffect, useState } from "react";
import { fetchPostsFromUser, fetchTags } from "../../utils/api";
import { Spinner, Button, Modal, Form } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import NavbarComp from "../../components/NavbarComp/NavbarComp";
import EditablePostList from "../../components/EditablePostList/EditablePostList";
import PageTitle from "../../components/PageTitle/PageTitle";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router";

function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { authUser, token } = useAuth();

  useEffect(() => {
    if (authUser) {
      fetchTags(token).then((tags) => {
        setTags(tags);
      });

      fetchPostsFromUser(authUser.userId, token).then(
        (result) => {
          setPosts(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(`Error fetching posts: ${error}`);
        }
      );
    }
  }, [authUser, token]);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  if (!authUser) {
    return <Navigate to="/" />;
  }
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
        <PageTitle title={"My posts"} />
        <div className="ps-4 pe-4 pt-2 bg-white rounded-3 ms-5 mt-5 me-5">
          {posts ? (
            <EditablePostList posts={posts} tags={tags} />
          ) : (
            "No posts found"
          )}
        </div>

        {/* Button to Open Modal */}
        <Button
          variant="primary"
          className="fixed-bottom mb-4 me-4"
          onClick={handleShowModal}
        >
          Create Post
        </Button>

        <Footer />


        {/* Modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="postTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="postDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="postInPerson">
                <Form.Check type="checkbox" label="In Person" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="postHourlyRate">
                <Form.Label>Hourly Rate</Form.Label>
                <Form.Control type="number" placeholder="Enter hourly rate" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default UserPosts;
