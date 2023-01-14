import React, { FC } from 'react'
import type { ChangeEvent } from 'react';
import { useState, useCallback } from 'react';
import { Button, Card, FloatingLabel, Form } from 'react-bootstrap'
import { PollOptions } from './PollOptions';
import { UserAddedTags } from './UserTags';
import { uniq } from '../../../utils/utils';
import { useAuth } from '../../../context/AuthContext';
import { createPostVerified } from '../../../utils/EntityStoreClient';

export const MAX_POST_LENGTH = 300;

export const CreatePost: FC<{}> = ({}) => {
    const { currentUser } = useAuth()!;

    // Handle Poll switch
    const [isPoll, setIsPoll] = useState(false);


    // Handle Tags
    const [inputString, setInputString] = useState("");
    const [words, setWords] = useState<string[]>([]);
    const updateInputTags = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue.trim() !== "" && inputValue[inputValue.length - 1] === " ") {
            setInputString("");
            const cTag = inputValue.trim();
            setWords(uniq([
                ...words,
                cTag.startsWith("#")
                    ? cTag
                    : `#${cTag}`
            ]));
        } else {
            setInputString(inputValue);
        }
    }, [words]);

    const updateWords = useCallback((words: string[]) => {
        setWords(words);
    }, []);


    // Handle Textarea
    const [charsLeft, setCharsLeft] = useState(MAX_POST_LENGTH);
    const [content, setContet] = useState("");
    const updateTextValue = useCallback((value: string) => {
        setCharsLeft(MAX_POST_LENGTH - value.length);
        setContet(value);
    }, []);

    const updateTextValueFromEvent = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateTextValue(e.target.value);
    }, [updateTextValue]);

    // Handle Poll Options
    const [options, setOptions] = useState<[number, string][]>([]);
    const updatePollOptions = useCallback((options: [number, string][]) => {
        setOptions(options);
    }, []);

    const clearDataFields = useCallback(() => {
        setWords([]);
        setIsPoll(false);
        updatePollOptions([]);
        updateTextValue("")
    }, [updatePollOptions, updateTextValue]);


     const handleSubmit = useCallback(async () => {

        try {
            const response = await createPostVerified(
                content, isPoll, options.map((opt) => opt[1]), words, currentUser
            );
            if ( response ) clearDataFields()
        } catch (e) {
            console.log(e);
        }
    }, [content, isPoll, options, words, currentUser, clearDataFields]);


    return (
        <Card>
            <Card.Title
                style={{
                    textAlign: "center",
                    fontSize: "200%"
                }}
            >
                Create your post
            </Card.Title>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Poll?"
                        disabled={!currentUser}
                        onChange={(e) => setIsPoll(e.target.checked)}
                    />
                    <Form.Group id="tags">
                        <UserAddedTags
                            values={words}
                            onChange={updateWords}
                        />
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Your tags: #PWrRocks"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                required
                                onChange={updateInputTags}
                                value={inputString}
                                placeholder=""
                            />
                        </FloatingLabel>

                    </Form.Group>
                    <Form.Text className="text-muted">
                        Characters left: {charsLeft}
                    </Form.Text>
                    <Form.Group className="mb-3" id="content">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder={isPoll ? "What is your question to people?" : "How is your day at PWr?"}
                            maxLength={MAX_POST_LENGTH}
                            onChange={updateTextValueFromEvent}
                            value={content}
                        />
                    </Form.Group>
                    { isPoll &&
                        <PollOptions
                            values={options}
                            updateOptions={updatePollOptions}
                        />
                    }
                </Form>
            </Card.Body>
            <Card.Footer>
                <Button
                    style={{
                        marginRight: "10px"
                    }}
                    onClick={(e) => handleSubmit()}
                >Post</Button>
                <Button id="bdi"
                    onClick={(e) => clearDataFields()}
                >
                    Reset
                </Button>
            </Card.Footer>
        </Card>
    );
}
