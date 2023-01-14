import { FC } from "react";
import { PostsBulk } from "./Dashboard";
import { CreatePost } from "./CreatePost/CreatePost";
import { Accordion } from "react-bootstrap";

export const MainColumn: FC<{
}> = ({}) => {
    return <>
        <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <h2 style={{fontWeight: "650"}}>Create your post</h2>
                </Accordion.Header>
                <Accordion.Body>
                    <CreatePost/>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        <br/>
        <PostsBulk/>
    </>
}
