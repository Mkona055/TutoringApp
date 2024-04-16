import EditablePost from "../EditablePost/EditablePost";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import {getAuthUserId, getJwtToken} from "../../utils"
export default function EditablePostList({ posts, tags }) {
    posts.map((post) => (console.log(post)))
    return (
        <div data-testid="post-list">
            <Row
            className="g-2 mb-5">         
                {posts.map((post) => (

                    <Col className="mb-4 "
                    xs={12}
                    md={6}
                    key={post.id}>
                        <EditablePost post={post} tags={tags}/>
                    </Col>
                ))} 
            </Row>
        </div>
    );
};