import "./ManageTags.css";
import React, { useEffect, useState } from "react";
import {
  fetchTags,
  createTag,
  deleteTagById,
  updateTagById,
} from "../../utils/api";
import { Spinner, Button, Modal, Form, Alert } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import NavbarComp from "../../components/NavbarComp/NavbarComp";
import PageTitle from "../../components/PageTitle/PageTitle";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router";
import Search from "../../components/Search/Search";
import { BsPencil, BsTrash } from "react-icons/bs";

function ManageTags() {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { authUser, token } = useAuth();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [editingTag, setEditingTag] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  const handleCloseErrorAlert = () => {
    setShowErrorAlert(false);
  };

  useEffect(() => {
    if (authUser) {
      fetchTags(token)
        .then(
          (result) => {
            setTags(result);
            setIsLoaded(true);
          },
          (error) => {
            setIsLoaded(true);
            setError(`Error fetching tags: ${error}`);
          }
        )
        .catch((error) => {
          setIsLoaded(true);
          setError(`Error fetching tags: ${error}`);
        });
    }
  }, [authUser, token]);

  useEffect(() => {
    setFilteredTags(
      tags.filter((tag) =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [tags, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleShowModal = () => setShowModal(true);

  const resetForm = () => {
    setTag("");
  };

  const handleDeleteTag = async (tagId) => {
    try {
      const response = await deleteTagById(tagId, token);
      if (response) {
        setTags(tags.filter((tag) => tag.id !== tagId));
        setShowSuccessAlert(true);
      } else {
        console.error("Error deleting tag:", error);
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error("Error deleting tag:", error);
      setShowErrorAlert(true);
    }
  };

  const handleUpdateTag = async (updatedTag) => {
    console.log("UPDATE TAG: ", updatedTag);
    try {
      const editedTag = await updateTagById(updatedTag.id, updatedTag, token);
      if (editedTag) {
        setEditingTag(null);
        setTags(tags.map((t) => (t.id === editedTag.id ? editedTag : t)));
        setShowSuccessAlert(true);
      } else {
        console.error("Error updating tag:", error);
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error("Error updating tag:", error);
      setShowErrorAlert(true);
    }
  };

  const handleCreateTag = async (e) => {
    e.preventDefault();
    try {
      const newTag = await createTag({ name: tag }, token);
      if (newTag) {
        setTags([...tags, newTag]);
        setShowSuccessAlert(true);
      } else {
        setShowErrorAlert(true);
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error creating post:", error);
      setShowErrorAlert(true);
    }
  };

  if (authUser?.role !== "ADMIN") {
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
        <PageTitle title={"Manage tags"} />
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

        {/* Search Bar */}
        <Search type={"TAG"} onSearch={handleSearch} />

        <div
          className={
            filteredTags && filteredTags.length === 0
              ? "mt-5 d-flex justify-content-center"
              : "mt-3 me-5 d-flex justify-content-end"
          }
        >
          <Button
            onClick={handleShowModal}
            className="bg-team-purple btn btn-primary"
          >
            + Create tag
          </Button>
        </div>
        <br />

        <div className="ps-4 pe-4 d-flex justify-content-center pt-2 bg-white rounded-3 ms-5 mt-5 me-5">
          <ul className="list-group w-50 ms-5 me-5">
            {filteredTags.map((tag) => (
              <li
                key={tag.id}
                className="list-group-item align-items-center row"
              >
                {editingTag?.id === tag.id ? (
                  <Form>
                    <Form.Control
                      type="text"
                      value={editingTag.name}
                      onChange={(e) => {
                        const newName = e.target.value;
                        setEditingTag((prevTag) => ({
                          ...prevTag,
                          name: newName,
                        }));
                      }}
                    />
                    <Button
                      variant="primary"
                      className="bg-team-purple mt-1"
                      onClick={() => handleUpdateTag(editingTag)}
                    >
                      Save Changes
                    </Button>
                  </Form>
                ) : (
                  <>
                    <div className="col">
                      <span>
                        {tag.name}{" "}
                        <span
                          className="cursor-pointer"
                          onClick={() => setEditingTag(tag)}
                        >
                          <BsPencil />{" "}
                        </span>{" "}
                      </span>
                    </div>
                    <div className="col">
                      <Button
                        variant="danger"
                        className="deleteButton position-absolute top-0 end-0"
                        onClick={() => handleDeleteTag(tag.id)}
                      >
                        <BsTrash />
                      </Button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        <Footer />

        {/* Modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Tag</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCreateTag}>
              <Form.Group className="mb-3" controlId="postTitle">
                <Form.Label>Tag name :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  required
                />
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

export default ManageTags;
