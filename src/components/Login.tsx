import React, { useRef, useState, useCallback } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from '../context/AuthContext';

export default function Login () {
    const
        emailRef = useRef<HTMLInputElement | null>(null),
        passwordRef = useRef<HTMLInputElement | null>(null),
        [error, setError] = useState(""),
        [loading, setLoading] = useState(false),
        { login } = useAuth()!;

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (emailRef.current === null || passwordRef.current === null) {
                return setError("Please fill all required fields.");
            }

            try {
                setError("");
                setLoading(true);
                await login(
                    emailRef.current.value,
                    passwordRef.current.value
                );
            } catch({ message }) {
                setError("Login failed. " + message);
            };

            setLoading(false);
    }, [login]);

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log in</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Log in!</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
