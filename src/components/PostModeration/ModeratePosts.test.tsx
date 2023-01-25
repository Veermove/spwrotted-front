import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Timestamp } from 'firebase/firestore';
import { Post } from '../../utils/Post';
import { ModeratePosts } from './ModeratePosts';
import { AuthContext, AuthProvider } from '../../context/AuthContext';
import { User, UserCredential } from 'firebase/auth';
import { SPWRUser } from '../../utils/User';
import * as ESC from '../../utils/EntityStoreClient'
import { act } from 'react-dom/test-utils';


test('Moderate posts: should show post', async () => {
    // given
    const mockPostData = mockPost();
    jest
        .spyOn(ESC, 'moderateNext')
        //Simulate that mode state value was set to 'new mode value'
        .mockReturnValue(new Promise(() => mockPostData))

    const value = {
        currentUser: [{} as unknown as User, {
            email: "adminmainl",
            name: "admin",
            role: 1,
            pwr_association: [0]
        }] as [User, SPWRUser] | null,
        loading: false,
        signup: (email: string, password: string, name: string, pwrAssoc: [boolean, boolean]) => ({} as unknown as Promise<UserCredential | null>),
        login: (email: string, password: string) => ({} as unknown as Promise<UserCredential>),
        logout: () => ({} as unknown as Promise<void>),
    };

    render(
        <AuthContext.Provider value={value}>
            <ModeratePosts/>
        </AuthContext.Provider>
    );

    act(() => {})

    const noPostsElement = screen.getByText(/postContent/i);
    expect(noPostsElement).toBeInTheDocument();
})

test('Moderate posts: should show empty message', () => {

    // given
    const value = {
        currentUser: [{} as unknown as User, {
            email: "adminmainl",
            name: "admin",
            role: 1,
            pwr_association: [0]
        }] as [User, SPWRUser] | null,
        loading: false,
        signup: (email: string, password: string, name: string, pwrAssoc: [boolean, boolean]) => ({} as unknown as Promise<UserCredential | null>),
        login: (email: string, password: string) => ({} as unknown as Promise<UserCredential>),
        logout: () => ({} as unknown as Promise<void>),
    };

    // when
    render(
        <AuthContext.Provider value={value}>
            <ModeratePosts/>
        </AuthContext.Provider>
    );

    const noPostsElement = screen.getByText(/No more posts to moderate, hooray!/i);
    expect(noPostsElement).toBeInTheDocument();
})

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
