import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';

function User({ user }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    // Perform delete logic here
    // For demo, just log the user id
    console.log('Deleting user with ID:', user.id);

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
      <Card style={{ width: '50rem' }} className="mb-3">
        <>
          <Button
            variant="danger"
            className="deleteButton position-absolute top-0 end-0 p-2 m-2"
            onClick={handleShowModal}
          >
            <BsTrash />
          </Button>
        </>
        <Card.Body>
          <Card.Title>{user.firstName} {user.lastName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">ID: {user.id}</Card.Subtitle>
          <Card.Text>
            Email: {user.email}<br />
            Location: {user.location}<br/>
            Role: {user.role}

          </Card.Text>
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user?
        </Modal.Body>
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
}

export default User;
