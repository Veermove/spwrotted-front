import React from 'react'
import type { ChangeEvent } from 'react';
import { useState, useCallback } from 'react';
import { Card, FloatingLabel, Form } from 'react-bootstrap'
import { PollOptions } from './PollOptions';
import { UserAddedTags } from './UserTags';


export const uniq = (input: string[]): string[] =>
    Object.keys(
        input.reduce(
            (acc, el) => { acc[el] = 1; return acc; },
            {} as Partial<Record<string, number>>,
        ),
    )

export const MAX_POST_LENGTH = 300;

export default function CreatePost() {
    const handleSubmit = () => {};

    // Handle Poll switch
    const [isPoll, setIsPoll] = useState(false);


    // Handle Tags
    const [inputString, setInputString] = useState("");
    const [words, setWords] = useState<string[]>([]);
    const updateInputTags = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue !== "" && inputValue[inputValue.length - 1] === " ") {
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
    const calculateCharsLeft = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setCharsLeft(MAX_POST_LENGTH - e.target.value.length)
    }, []);

    // Handle Poll Options
    const [options, setOptions] = useState<[number, string][]>([]);
    const updatePollOptions = useCallback((options: [number, string][]) => {
        setOptions(options);
    }, []);


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
                            onChange={calculateCharsLeft}
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
        </Card>
    );
}
