import { FC } from "react";

export const CommentComponent: FC<{
    comment: { value: string, likes: number, author: string },
}> = ({comment}) => {
    return <>{comment.value}</>
}
