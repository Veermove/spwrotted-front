import React, { ChangeEvent, FC, MouseEvent, useCallback, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Spinner } from 'react-bootstrap';
import { Post } from '../../utils/Post';
import { PostComponent } from './Post/PostComponent';
import { getPostsPagin } from '../../utils/EntityStoreClient';
import { uniq, uniqPosts } from '../../utils/utils';
import { UserAddedTags } from './CreatePost/UserTags';

export const PostsBulk: FC<{}> = ({}) => {

    // Handle search tags
    const [inputString, setInputString] = useState("");
    const [queryTags, setQueryTags] = useState<string[]>([]);
    const updateInputTags = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue.trim() !== "" && inputValue[inputValue.length - 1] === " ") {
            setInputString("");
            const cTag = inputValue.trim();
            setQueryTags(uniq([
                ...queryTags,
                cTag.startsWith("#")
                    ? cTag
                    : `#${cTag}`
            ]));
        } else {
            setInputString(inputValue);
        }
    }, [queryTags]);

    const updateWords = useCallback((words: string[]) => {
        setQueryTags(words);
    }, []);

    // Handle data fetching
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState<Post[] | undefined>(undefined);

    const appendPosts = useCallback((newPosts: Post[], invalidate?: boolean) => {
        if (data && invalidate) {
            setData(uniqPosts([...data, ...newPosts]));
        } else {
            setData(newPosts);
        }
    }, [data]);

    const fetchData = useCallback(async (
        lastPost?: Post, qTags?: string[], invalidate?: boolean
    ) => {

            setIsError(false);
            setIsLoading(true);
            try {
                const d = await getPostsPagin(lastPost, qTags);
                appendPosts(d, invalidate);
                setIsLoading(false);
            } catch (e) {
                setIsError(true);
            }
    }, [appendPosts]);

    const loadMore = useCallback((e: MouseEvent<HTMLElement>) => {
        if (data)
            fetchData(data[data?.length - 1], queryTags)
        else {
            fetchData(undefined, queryTags);
        }
    }, [data, fetchData, queryTags]);

    useEffect(() => {
        fetchData();
    }, []);


    const searchByTags = useCallback((e: MouseEvent<HTMLElement>) => {
        if (queryTags) {
            fetchData(undefined, queryTags, true);
        }
    }, [fetchData, queryTags]);

    if (isLoading || isError) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

    return (
        <>
            <UserAddedTags
                    values={queryTags}
                    onChange={updateWords}
                />
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
            >
                <FloatingLabel
                        controlId="floatingInput"
                        label="Try searching by tags: #ILovePWr"
                        className="mb-3"
                        style={{
                            height: "40px",
                            width: "100%"
                        }}
                    >
                    <Form.Control
                        type="text"
                        required
                        onChange={updateInputTags}
                        value={inputString}
                        placeholder=""
                    />
                </FloatingLabel>
                <Button
                    style={{
                        marginLeft: "10px"
                    }}
                    onClick={searchByTags}
                >
                    Search!
                </Button>
            </div><br/>
            {([...data!])
                .map((s) => (
                    <PostComponent key={s.id} postData={s} />
                ))}
            <Button
                onClick={loadMore}
            >Load more!</Button>
        </>
    )
}
