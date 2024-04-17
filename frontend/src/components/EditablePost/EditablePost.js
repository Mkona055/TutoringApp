import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";
import "./EditablePost.css";
import { CANADIAN_CITIES_AND_PROVINCES } from "../../utils/cities";
import useAuth from "../../hooks/useAuth";

const EditablePost = ({ post, tags }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(post);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // State for tag selector
  const [tagSearchTerm, setTagSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);

  // State for location selector
  const [location, setLocation] = useState(post.location);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [invalidLocationError, setInvalidLocationError] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {isAuthenticated, token} = useAuth();

  useEffect(() => {
    const filtered = tags.filter((tag) =>
      tag.name.toLowerCase().includes(tagSearchTerm.toLowerCase())
    );
    setFilteredTags(filtered);
  }, [tagSearchTerm, tags]);

  useEffect(() => {
    const allTagIds = post.tags.map((tag) => tag.id);
    setSelectedTags(allTagIds);
  }, [post.tags]);

  useEffect(() => {
    const allTagIds = post.tags.map((tag) => tag.id);
    setSelectedTags(allTagIds);
  }, [post.tags]);

  useEffect(() => {
    const tagsSelected = selectedTags.map((tag) => {
      const tagObj = tags.find((t) => t.id === tag);
      return tagObj;
    });

    if (updatedPost) {
      setUpdatedPost((prevUpdatedPost) => ({
        ...prevUpdatedPost,
        location: location,
        tags: tagsSelected,
      }));
    }
    // eslint-disable-next-line
  }, [selectedTags, location, tags]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    let locationExists = CANADIAN_CITIES_AND_PROVINCES.some((subArray) => {
      // Check if every element in 'toCheck' exists in 'subArray'
      return location.split(", ").every((value, index) => {
        return subArray[index] === value;
      });
    });
    if (!locationExists) {
      setInvalidLocationError("Please choose a location from the list");
    } else {
      console.log("Updated Post:", updatedPost);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost({
      ...updatedPost,
      [name]: value,
    });
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
  const handleLocationSearchChange = (event) => {
    const { value } = event.target;
    setLocation(value);

    // Debounce the filtering function
    setTimeout(() => {
      const filtered = CANADIAN_CITIES_AND_PROVINCES.filter(
        ([city, province]) =>
          city.toLowerCase().includes(value.toLowerCase()) ||
          province.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    }, 300); // 300ms debounce delay
  };

  return (
    <Card className="h-100">
      {!isEditing && (
        <>
          <Button
            variant="danger"
            className="deleteButton position-absolute top-0 end-0 p-2 m-2"
            onClick={handleDelete}
          >
            <BsTrash />
          </Button>
        </>
      )}

      <Card.Body>
        <Card.Title className="mt-2">
          {isEditing ? (
            <Form.Control
              type="text"
              name="title"
              value={updatedPost.title}
              onChange={handleChange}
            />
          ) : (
            post.title
          )}
        </Card.Title>
        <Card.Text>
          <strong>Hourly Rate:</strong>
          {isEditing ? (
            <Form.Control
              type="number"
              min={0}
              max={100}
              name="hourlyRate"
              value={updatedPost.hourlyRate}
              onChange={handleChange}
            />
          ) : (
            <span> ${post.hourlyRate} </span>
          )}
        </Card.Text>
        <Card.Text>
          <strong>Posted By:</strong> {post.user.firstName} {post.user.lastName}
        </Card.Text>
        <Card.Text>
          <strong>Tags:</strong>{" "}
          {isEditing ? (
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
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search tags..."
                    value={tagSearchTerm}
                    onChange={handleTagSearchChange}
                    onClick={toggleDropdown}
                  />
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
          ) : (
            post.tags.map((tag) => (
              <div key={tag.id} className="mx-1 badge bg-team-purple">
                {tag.name}
              </div>
            ))
          )}
        </Card.Text>
        {isEditing ? (
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>
              <strong>Location:</strong>
            </Form.Label>
            <Form.Control
              className={`${invalidLocationError ? "is-invalid" : ""}`}
              list="locationDetails"
              placeholder="Enter location"
              value={location}
              onChange={handleLocationSearchChange}
            />
            <datalist id="locationDetails">
              {filteredOptions.map(([city, province]) => (
                <option
                  key={`${city}-${province}`}
                  value={`${city}, ${province}`}
                />
              ))}
            </datalist>
            {invalidLocationError && (
              <Form.Control.Feedback type="invalid">
                {invalidLocationError}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        ) : (
          <Card.Text>
            <strong>Location:</strong> {post.location}
          </Card.Text>
        )}
        <Card.Text className="mt-2">
          <strong>Description:</strong>
          {isEditing ? (
            <textarea
              className="form-control"
              name="description"
              value={updatedPost.description}
              onChange={handleChange}
              rows="3"
            />
          ) : (
            <p>{post.description}</p>
          )}
        </Card.Text>
        {isEditing ? (
          <Button
            variant="primary"
            className="bg-team-purple"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        ) : (
          <div className="text">
            <Button variant="light" onClick={handleEdit}>
              <BsPencil /> Edit
            </Button>
          </div>
        )}
      </Card.Body>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default EditablePost;
