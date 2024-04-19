import React, { useState } from 'react';
import { FormControl, Button, Row, Col, Form } from 'react-bootstrap';

function Search({ type, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '' && type !== 'TAG') {
      setIsValid(false);
    } else {
      setIsValid(true);
      onSearch(searchTerm);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Form className="w-50">
        <Row className="align-items-center">
          <Col xs={8}>
            <FormControl
              type="text"
              placeholder={
                type === 'USER'
                  ? 'Enter the id of the user'
                  : type === 'TAG'
                      ? 'Enter the name of the tag'
                      : 'Enter the id of the post'
              }
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsValid(true); // Reset validation when user types
              }}
              isInvalid={!isValid}
              className="mr-sm-2"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid ID.
            </Form.Control.Feedback>
          </Col>
          <Col xs={4}>
            <Button
              type="submit"
              variant="primary"
              className="bg-team-purple"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Search;
