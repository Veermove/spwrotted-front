import { FC, useCallback, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Post } from "../../../utils/Post";
import { formatNumber } from "../../../utils/utils";
import { VotePollOptions } from "./VotePollOptions";

export const PostComponent: FC<{
    postData: Post,
}> = ({postData}) => {

    const [hasLiked, setHasLiked] = useState(false);

    return (<>
        <Card>
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
                    />
                }

            </Card.Body>
            <Card.Footer
                style = {{
                    display:"flex",
                    flexDirection:"row"
                }}
            >
                <Button
                    style={{
                        display: "flex",
                        border: "1px solid #003377",
                        backgroundColor: "#0066EE",
                        width: "auto",
                        lineHeight: "18px",
                        borderRadius: "5px",
                    }}
                >
                    Like
                </Button>
                <Card.Text
                    style={{
                        display: "flex",
                        width: "auto",
                        lineHeight: "18px",
                        borderRadius: "5px",
                        paddingRight:"40px"
                    }}
                >
                    Likes: {formatNumber(postData.likes)}
                </Card.Text>
                <Button
                    style={{
                        display: "flex",
                        border: "1px solid #003377",
                        backgroundColor: "#0066EE",
                        width: "auto",
                        lineHeight: "18px",
                        borderRadius: "5px",
                    }}
                >
                    Comment
                </Button>
            </Card.Footer>
        </Card>
        <br/>
    </>)
}



