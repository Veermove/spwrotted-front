import { FC } from "react";
import { Post } from "../../../utils/Post";
import { Card } from "react-bootstrap";
import { VotePollOptions } from "./VotePollOptions";

export const PostBody: FC<{
    postData: Post,
    disabled: boolean,
}> = ({postData, disabled}) => {
    return <>
        <Card.Header
            style={{
                display:"flex",
                flexDirection:"row",
            }}
        >
            <div
                style={{
                    display:"flex",
                    paddingRight: "15px",
                }}
            >
                {postData.author}
            </div>
            {postData.tags.slice(0, 10).map((t) => (
                <Card.Text
                    key={t}
                    style={{
                        display:"flex",
                        paddingRight:"5px"
                    }}
                >
                    {t}
                </Card.Text>
            ))}
        </Card.Header>
        <Card.Body>
            {postData.content}
            {postData.isPoll &&
                <VotePollOptions
                    pollOptions={postData.pollOptions!}
                    postId={postData.id}
                    disabled={disabled}
                />
            }

        </Card.Body>
    </>
}
