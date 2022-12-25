import './App.css';
import React from "react";

import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {

    return(
        <Container
            className="d-flex
                align-items-center
                justify-conent-center"
            style={{ minHeight: "100vh" }}
        >
        <div className="w-100" style={{ maxWidth: "400px" }}>
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Dashboard />}/>
                        <Route path="/signup" element={<Signup />}/>
                        <Route path="/login" element={<Login />}/>
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
        </Container>

    )
}

export default App;
