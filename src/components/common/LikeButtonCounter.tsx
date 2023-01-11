import { FC, useState, MouseEvent, useCallback } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { formatNumber, PublishLikeOrUnlikeFunction } from "../../utils/utils";

export const LikeButtonCounter: FC<{
    likeFunction: PublishLikeOrUnlikeFunction,
    initialLikes: number,
}> = ({likeFunction, initialLikes }) => {

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [likeOrUnlike, setLikeOrUnlike] = useState(true);
    const [likes, setLikes] = useState(initialLikes);

    const onLikeButtonPressed = useCallback(async (e: MouseEvent<HTMLButtonElement>) => {
        try {
            setButtonDisabled(true);
            console.log(likeOrUnlike)
            const newLikes = await likeFunction(likeOrUnlike);
            setLikes(newLikes);
            setLikeOrUnlike(!likeOrUnlike)
            setTimeout(() => { setButtonDisabled(false); }, 1000);
        } catch(e) {
            console.log(e);
        }
    }, [likeFunction, likeOrUnlike])



    return <>
        <ButtonGroup size="sm">
            <Button
                disabled={buttonDisabled}
                onClick={onLikeButtonPressed}
            >
                Like
            </Button>
            <Button
                disabled={true}
            >
                {formatNumber(likes)}
            </Button>
        </ButtonGroup>
    </>

}
