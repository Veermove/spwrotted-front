import { User } from "firebase/auth";
import { CommentsAggregate, Post } from "./Post";

// essownik12@mail.com
// 1qazxsw2

const entitySecrets = {
    url: "http://localhost:8079/pwrspotted/api/v1",
    endpoints: {
        createVerified: "/post/create/verified",
        createUnerified: "/post/create/verified",
        pollVote: "/post/poll/vote",
        postGetPagin: "/post/pagin",
        likeAPost: "/post/like",
        getComments: "/comments",
        createComment: "/comments/create",
        likeAComment: "/comments/like",
    }
}

export const getPostsPagin = async (
    lastPost?: Post,
    queryTags?: string[],
) => {
    const url = entitySecrets.url + entitySecrets.endpoints.postGetPagin;
    const body = JSON.stringify({ lastPost });

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: body,
            mode: 'cors',
        });

        if (response.ok) {
            const ret = await response.json();
            const { posts } = ret;
            return posts as Post[]
        }
    } catch (e) {
        console.log(e);
    }

    throw Error("Failed to fetch queries");

}

export const getCommentsForPost = async (
    postId: string
) => {
    const url = entitySecrets.url + entitySecrets.endpoints.getComments;
    const body = JSON.stringify({ postId: postId });

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: body,
        mode: 'cors',
    });
    if (response.status === 200) {
        const ret = await response.json();
        const { commentsAgregation } = ret;
        return commentsAgregation as CommentsAggregate;
    }

    console.log(`Failed to fetch comments: ${response.status}`);
    return { postId, comments: [] } as CommentsAggregate;
}

export const voteInPoll = async (
    options: string[],
    postId: string,
) => {
    const url = entitySecrets.url + entitySecrets.endpoints.pollVote;
    const body = JSON.stringify({
        postId, options
    });

    console.log(body);

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: body,
        mode: 'cors',
    });

    if (response.ok) {
        const respBody = await response.json();
        const pollOptions: {option: string, votes: number}[] =  respBody.pollOptions;
        console.log(pollOptions);
        return {
            newPollOptions: pollOptions,
            total:
                pollOptions
                    .map(({option, votes}) => votes)
                    .reduce((c, n) => c + n)
        };
    } else if (response.status === 400) {
        const respBody = await response.json();
        console.log(respBody.err);
    }

    throw Error("Failed to vote in poll");
}

export const createComment = async (
    comment: string,
    postId: string,
    author: User,
) => {
    const url = entitySecrets.url + entitySecrets.endpoints.createComment;
    const body = JSON.stringify({
        author: author.email,
        comment,
        postId,
    });

    const jwtToken = await author.getIdToken();

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: body,
        mode: 'cors',
    });

    if (response.ok) {
        return;
    } else if (response.status === 500) {
        const respBody = await response.json();
        console.log(respBody.err);
    }
}

export const likeAComment = async (
    likeOrUnlike: boolean,
    postId: string,
    author: string,
    timestamp: number,
) => {
    const url = entitySecrets.url + entitySecrets.endpoints.likeAComment;
    const body = JSON.stringify({
        author,
        postId,
        timestamp,
        likedOrUnliked: likeOrUnlike
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: body,
            mode: 'cors',
        });

        if (response.ok) {
            const { newLikes } = await response.json();
            return newLikes as number;
        } else if (response.status === 500) {
            const respBody = await response.json();
            console.log(respBody.err);
            throw Error("Failed to like a comment");
        }
    } catch (e) {
        console.log(e);
        return -1;
    }

    return -1;
}

export const likeAPost = async (
    likeOrUnlike: boolean,
    postId: string,
) => {
    const url = entitySecrets.url + entitySecrets.endpoints.likeAPost;
    const body = JSON.stringify({
        postId,
        likedOrUnliked: likeOrUnlike
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: body,
            mode: 'cors',
        });

        if (response.ok) {
            const { newLikes } = await response.json();
            return newLikes as number;
        } else if (response.status === 500) {
            const respBody = await response.json();
            console.log(respBody.err);
            throw Error("Failed to like a comment");
        }
    } catch (e) {
        console.log(e);
        return -1;
    }

    return -1;
}

export const createPostVerified = async (
    content: string,
    isPoll: boolean,
    pollOptions: string[],
    tags: string[],
    user?: User | null,
) => {

    if (user !== null && user !== undefined) {

        const url = entitySecrets.url + entitySecrets.endpoints.createVerified;
        const body = JSON.stringify({
            author: user?.email,
            content,
            isPoll,
            pollOptions: pollOptions.map((v) => ({option: v, votes: 0})),
            tags,
        });


        const jwtToken = await user?.getIdToken();

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: body,
            mode: 'cors',
        });

        if (response.ok) {
            const respBody = await response.json();
            const post: Post =  respBody.post;
            return post;
        } else if (response.status === 500) {
            const respBody = await response.json();
            console.log(respBody.err);
        }
    }


    throw Error("Failed to create post");
}
