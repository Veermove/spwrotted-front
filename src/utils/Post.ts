import { Timestamp } from "firebase/firestore";

export interface Post {
    id: string,
    author: string,
    creationDate: Timestamp,

    content: string,
    isPoll: boolean,
    pollOptions?: {
        option: string,
        votes: number,
    }[],
    tags: string[],
    likes: number,
}
