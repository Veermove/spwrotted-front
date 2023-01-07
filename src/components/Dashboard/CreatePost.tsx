import React, { useRef } from 'react'
import { Form } from 'react-bootstrap'



import type { FC, ChangeEvent, ReactNode } from 'react';
import { useState, useCallback } from 'react';


export const uniq = (input: string[]): string[] =>
    Object.keys(
        input.reduce(
            (acc, el) => { acc[el] = 1; return acc; },
            {} as Partial<Record<string, number>>,
        ),
    )



export const MyTag: FC<{
    value: string;
    onClick?: (val: string) => void;
}> = ({ value, onClick }) => {

    return (
        <div
            style={{
                display: "flex",
                border: "1px solid #003377",
                padding: "5px",
                color: "white",
                fontWeight: 700,
                backgroundColor: "#0066EE",
                width: "auto",
                lineHeight: "18px",
                borderRadius: "5px",
                cursor: "pointer",
            }}
            onClick={() => { if (onClick) onClick(value); }}
        >
            { value }
        </div>
    );
};


export const MyTagContainer: FC<{ children: ReactNode; }> = ({ children }) => {

    return (
        <div style={{
            display: "flex",
            // border: "1px solid red",
            padding: "5px",
            gap: "10px",
            // width: "500px",
            flexDirection: "row",
        }}>
            { children }
        </div>
    );
};


export const MyTags: FC<{
    values: string[];
    onChange?: (values: string[]) => void;
}> = ({ onChange, values }) => {

    const onTagClick = useCallback((word: string) => {
        if (onChange) {
            onChange(values.filter((v) => v !== word));
        }
    }, [onChange, values])


    return (
        <MyTagContainer>
            { values.map((value) => (
                <MyTag
                    key={value}
                    value={value}
                    onClick={onTagClick}
                />
            ))}
        </MyTagContainer>
    );
};



export default function CreatePost() {
    const handleSubmit = () => {},
        tagsRef = useRef<HTMLInputElement | null>(null);

    const [inputString, setInputString] = useState("");
    const [words, setWords] = useState<string[]>([]);
    const updateInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
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


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
                <Form.Label style={{
                    fontWeight: "900",
                }}>
                    Tags:
                </Form.Label>
                <MyTags values={words} onChange={updateWords} />
                <Form.Control
                    type="text"
                    ref={tagsRef}
                    required
                    onChange={updateInput}
                    value={inputString}
                />
            </Form.Group>
        </Form>
    );
}
