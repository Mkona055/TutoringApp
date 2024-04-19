import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form, FormControl } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";
import "./EditablePost.css";
import useAuth from "../../hooks/useAuth";

const EditablePost = ({ post, tags, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(post);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // State for tag selector
  const [tagSearchTerm, setTagSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [hasTags, setHasTags] = useState(false);
  const {authUser} = useAuth();


  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    if (selectedTags.length > 0) {
      setHasTags(true);
    }else{
      setHasTags(false);
    }

    if (updatedPost) {
      setUpdatedPost((prevUpdatedPost) => ({
        ...prevUpdatedPost,
        tags: selectedTags.join(','),
      }));
    }
    // eslint-disable-next-line
  }, [selectedTags, tags]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    console.log("Updated Post:", updatedPost);
    if (hasTags) {
      onUpdate(updatedPost);    
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    onDelete(post.id);
    setShowDeleteModal(false);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "inPerson"){
      value = value === "true" ? true : false;
    }
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
              <strong>Location {updatedPost.inPerson ? `(${authUser.location}):` : ":"}</strong>
            </Form.Label>
            <select
              className="form-control"
              id="location"
              name="inPerson"
              value={updatedPost.inPerson}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a location
              </option>
              <option value={true}>In person</option>
              <option value={false}>Online</option>
            </select>
          </Form.Group>
        ) : (
          <Card.Text>
            <strong>Location {post.inPerson ? `(${authUser.location}):` : ":"}</strong> {post.inPerson ? `In person:` : "Online"}
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
