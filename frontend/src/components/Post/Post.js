import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import "./Post.css";
import useAuth from "../../hooks/useAuth";

const Post = ({ post, hasContactButton = true, allowDelete, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { authUser } = useAuth();

  const handleDelete = () => {
    // Perform delete logic here
    // For demo, just log the user id
    onDelete(post.id);

    // Close the modal after deletion
    setShowDeleteModal(false);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleShowModal = () => {
    setShowDeleteModal(true);
  };

  return (
    <>
      <Card className={allowDelete ? "h-100 w-50" : "h-100"}>
        {allowDelete && (
          <>
            <Button
              variant="danger"
              className="deleteButton position-absolute top-0 end-0 p-2 m-2"
              onClick={handleShowModal}
            >
              <BsTrash />
            </Button>
          </>
        )}
        <Card.Body>
          <Card.Title className="mt-2">{post.title}</Card.Title>
          {authUser?.role === "ADMIN" && (
            <>
              <Card.Text>
                <strong>User ID:</strong> {post.user.id}
              </Card.Text>
              <Card.Text>
                <strong>Post ID:</strong> {post.id}
              </Card.Text>
            </>
          )}

          <Card.Text>
            <strong>Hourly Rate:</strong> ${post.hourlyRate}
          </Card.Text>
          <Card.Text>
            <strong>Posted By:</strong> {post.user.firstName}{" "}
            {post.user.lastName}
          </Card.Text>
          <Card.Text>
            <strong>Tags:</strong>{" "}
            {post.tags.map((tag) => (
              <div key={tag.id} className="mx-1 badge bg-team-purple">
                {tag.name}
              </div>
            ))}
          </Card.Text>

          <Card.Text>
            <strong>
              Location {post.inPerson ? `(${post.user.location})` : ""}:
            </strong>{" "}
            {post.inPerson ? "In Person" : "Online"}
          </Card.Text>

          <Card.Text className="mt-2">
            <strong>Description:</strong>
            <p>{post.description}</p>
          </Card.Text>
        </Card.Body>
        {hasContactButton && (
          <Card.Footer className="d-flex justify-content-between align-items-center">
            <Button
              className="bg-team-purple"
              href={`mailto:${post.user.email}`}
            >
              Contact
            </Button>
          </Card.Footer>
        )}
      </Card>
      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Post;
