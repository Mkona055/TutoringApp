import React from 'react';
import { Card, Button } from 'react-bootstrap';
import "./Post.css";
const Post = ({ post, hasContactButton=true }) => {
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title className="mt-2">{post.title}</Card.Title>
        <Card.Text>
          <strong>Hourly Rate:</strong> ${post.hourlyRate}
        </Card.Text>
        <Card.Text>
          <strong>Posted By:</strong> {post.user.firstName} {' '} {post.user.lastName}
        </Card.Text>
        <Card.Text>
          <strong>Tags:</strong> {' '}
          {post.tags.map((tag) => (
            <div key={tag.id} className="mx-1 badge bg-team-purple">
              {tag.name}
            </div>
          ))}
        </Card.Text>
        {post.inPerson && (
          <Card.Text>
            <strong>Location:</strong> In Person
          </Card.Text>
        )}
        <Card.Text className="mt-2">
            <strong>Description:</strong> 
            <p>{post.description}</p>
        </Card.Text>
      </Card.Body>
      {hasContactButton && (
        <Card.Footer className="d-flex justify-content-between align-items-center">
          <Button className='bg-team-purple' href={`mailto:${post.user.email}`}>Contact</Button>
        </Card.Footer>)}
    </Card>
  );
};

export default Post;
