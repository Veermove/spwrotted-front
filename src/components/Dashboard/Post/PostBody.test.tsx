import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { PostBody } from './PostBody';
import { Post } from "../../../utils/Post";
import { Timestamp } from 'firebase/firestore';

test('PostBody should poll options when post is a poll', () => {

    //given
    const post = mockPost();
    post.isPoll = true;
    post.pollOptions = [{
            option: "Example option",
            votes: 0
        },
        {
            option: "Other option",
            votes: 0
        }
    ]

    //when
    render(<PostBody postData={post} disabled={false} />);

    //then
    const firstOption = screen.getByText(/Example option/i);
    expect(firstOption).toBeInTheDocument();
    const secondOption = screen.getByText(/Other option/i);
    expect(secondOption).toBeInTheDocument();

});

test('PostBody should display author and conent', () => {

    //given
    const post = mockPost();

    //when
    render(<PostBody postData={post} disabled={false} />);

    //then
    const authorElement = screen.getByText(/postAuthor/i);
    expect(authorElement).toBeInTheDocument();
    const contentElement = screen.getByText(/postContent/i);
    expect(contentElement).toBeInTheDocument();

});

const mockPost = () => ({
    id: "postId",
    author: "postAuthor",
    creationDate: Timestamp.now(),
    content: "postContent",
    isPoll: false,
    pollOptions: undefined,
    tags: ["tag"],
    likes: 0,
}) as Post;
