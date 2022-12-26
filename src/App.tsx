import './App.css';
import React from "react";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import Dashboard from "./components/Dashboard";

import SidebarLoggedOut from './components/SidebarLoggedOut';
import PageSpanner from './components/PageSpanner';

function App() {
    /* #TODO: Fix layout
    This is wrong. Final layout should be more akin to:
    ________________________
    |SPWR                  |
    |______________________|
    |    Posts     | L   I |
    |    Posts     | O - N |
    |    Posts     | G     |
    |    Posts     |       |
    |    Posts     |       |
    |    Posts     |       |
    |    Posts     |       |
    |    Posts     |       |
    So Routes element is not really needed here (for this purpose)
    */
    // return(
    //     <Container
    //         className="d-flex
    //             align-items-center
    //             justify-conent-center"
    //         style={{ minHeight: "100vh" }}
    //     >
    //     <div className="w-100" style={{ maxWidth: "400px" }}>
    //         <Router>
    //             <AuthProvider>
    //                 <Routes>
    //                     <Route path="/" element={<Dashboard />}/>
    //                     <Route path="/signup" element={<Signup />}/>
    //                     <Route path="/login" element={<Login />}/>
    //                 </Routes>
    //
    //         </Router>
    //     </div>
    //     </Container>

    // )
    return (
        <>
        <Container fluid>
        <AuthProvider>
            <PageSpanner />
        </AuthProvider>
        </Container>
        </>
        );
}

export default App;
