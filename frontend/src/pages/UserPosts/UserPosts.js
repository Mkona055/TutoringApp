import "./UserPosts.css"
import { useEffect, useState } from "react";
import { fetchPostsFromUser, fetchTags, createPost, deletePostById, updatePostById } from "../../utils/api"; // Assuming you have a createPost function in your API
import { Spinner, Button, Modal, Form, Alert, FormControl } from "react-bootstrap";
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
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postInPerson, setPostInPerson] = useState(false);
  const [postHourlyRate, setPostHourlyRate] = useState("");
 // State for tag selector
 const [tagSearchTerm, setTagSearchTerm] = useState("");
 const [selectedTags, setSelectedTags] = useState([]);
 const [filteredTags, setFilteredTags] = useState([]);

 const [dropdownOpen, setDropdownOpen] = useState(false);
 const [ hasTags, setHasTags] = useState(true);

  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  const handleCloseErrorAlert = () => {
    setShowErrorAlert(false);
  };

  
  useEffect(() => {
    
    // eslint-disable-next-line
  }, [selectedTags]);

  useEffect(() => {
    const filtered = tags.filter((tag) =>
      tag.name.toLowerCase().includes(tagSearchTerm.toLowerCase())
    );
    setFilteredTags(filtered);
  }, [tagSearchTerm, tags]);

  useEffect(() => {
    if (authUser) {
      fetchTags(token).then((tags) => {
        setTags(tags);
      });

      fetchPostsFromUser(authUser.userId, token).then(
        (result) => {
          console.log(result);
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

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleShowModal = () => setShowModal(true);

  const resetForm = () => {
    setPostTitle("");
    setPostDescription("");
    setPostInPerson(false);
    setPostHourlyRate("");
    setSelectedTags([]);
  };
  const handleTagSearchChange = (e) => {
    setTagSearchTerm(e.target.value);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleTagSelection = (tag) => {
    const tagId = tag.id;
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleDeletePost = async (postId) => {
    try{
      const response = await deletePostById(postId, token);
      if (response){
        setPosts(posts.filter((post) => post.id!== postId));
      }else{
        console.error("Error deleting post:", error);
        setShowErrorAlert(true);
      }
    }catch (error) {
      console.error("Error deleting post:", error);
      setShowErrorAlert(true);
    }
  }

  const handleUpdatePost = async (updatedPost) => {

    try {
      updatedPost.user = null;
      const editedPost = await updatePostById(updatedPost.id, updatedPost,token);
      if (editedPost){
        setPosts(posts.map((post) => (post.id === editedPost.id? editedPost : post)));
        setShowSuccessAlert(true);

      }else{
        console.error("Error updating post:", error);
        setShowErrorAlert(true);
      }

    } catch (error) {
      console.error("Error creating post:", error);
      setShowErrorAlert(true);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (selectedTags.length > 0) {
      setHasTags(true);
    }else{
      setHasTags(false);
      return;
    }
    try {
      const newPost = await createPost({
        title: postTitle,
        description: postDescription,
        inPerson: postInPerson,
        hourlyRate: postHourlyRate,
        userId: authUser.userId,
        userRole: authUser.role, 
        tags: selectedTags
      }, token);
      if (newPost){
        setPosts([...posts, newPost]);
        setShowSuccessAlert(true);

      }else{
        setShowErrorAlert(true);

      }
      setShowModal(false);

      // Add new post to the existing list of posts
     
    } catch (error) {
      console.error("Error creating post:", error);
      setShowErrorAlert(true);
    }
  };

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
          <Spinner animation="border" />
        </div>
      </>
    );
  } else {
    return (
      <>
        <NavbarComp />
        <PageTitle title={"My posts"} />
        <div className="container mt-3 d-flex justify-content-center ">
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
        

        <div
          className={
            posts && posts.length === 0
              ? "mt-5 d-flex justify-content-center"
              : "mt-3 me-5 d-flex justify-content-end"
          }
        >
          <Button
            onClick={handleShowModal}
            className="bg-team-purple btn btn-primary"
          >
            + Create post
          </Button>
        </div>
        <br />

        <div className="ps-4 pe-4 pt-2 bg-white rounded-3 ms-5 mt-5 me-5">
          {posts && <EditablePostList posts={posts} tags={tags} onDelete={handleDeletePost} onUpdate={handleUpdatePost}/>}
        </div>

        <Footer />

        {/* Modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCreatePost}>
              <Form.Group className="mb-3" controlId="postTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="postDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  value={postDescription}
                  onChange={(e) => setPostDescription(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="postInPerson">
                <Form.Label>Location <strong>{postInPerson ? `(${authUser.location})` : ""}</strong></Form.Label>
                <Form.Control
                  as="select"
                  value={postInPerson ? "inPerson" : "online"}
                  onChange={(e) =>
                    setPostInPerson(e.target.value === "inPerson")
                  }
                >
                  <option value="online">Online</option>
                  <option value="inPerson">In Person</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="postHourlyRate">
                <Form.Label>Hourly Rate</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  max={100}
                  placeholder="Enter hourly rate"
                  value={postHourlyRate}
                  onChange={(e) => setPostHourlyRate(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
              <Form.Label>Tags:{" "}</Form.Label>
          
              <>
                {selectedTags.map((tagId) => {
                  const tag = tags.find((t) => t.id === tagId);
                  return (
                    <div key={tag.id} className="mx-1 badge bg-team-purple">
                      {tag.name}
                    </div>
                  );
                })}
                <div className="tag-selector mt-2">
                  <div className="tag-selector-input">
                  <FormControl
                    type="text"
                    className="form-control"
                    placeholder="Search tags..."
                    isInvalid={!hasTags}

                    value={tagSearchTerm}
                    onChange={handleTagSearchChange}
                    onClick={toggleDropdown}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please select a tag.
                </Form.Control.Feedback>
                  </div>
                  {dropdownOpen && (
                    <div className="tag-selector-dropdown ps-4 pt-2">
                      {filteredTags.length === 0 && <div>No results found</div>}
                      {filteredTags.map((tag) => (
                        <div key={tag.id} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`tag-${tag.id}`}
                            value={tag.id}
                            checked={selectedTags.includes(tag.id)}
                            onChange={() => handleTagSelection(tag)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`tag-${tag.id}`}
                          >
                            {tag.name}
                          </label>
                        </div>
                      ))}
                      <div className="tag-selector-footer">
                        <button
                          className="btn btn-secondary mt-2 mb-2"
                          onClick={toggleDropdown}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
          
              </Form.Group>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button type="submit" className="bg-team-purple">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default UserPosts;
