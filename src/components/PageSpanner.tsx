import React from 'react'
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";

import SidebarLoggedOut from './SidebarLoggedOut';
import { useAuth } from '../context/AuthContext';

export default function PageSpanner() {
    const { currentUser, loading, logout } = useAuth()!;

    return (<>
        <Row>
            <Col xs={10} id="page-content-wrapper">
                <>{currentUser?.email}</>
            </Col>
            <Col xs={2} id="sidebar-wrapper">
                { loading && <SidebarLoggedOut />}
                { !loading &&
                    <Button onClick={async () => await logout() }> Sing out
                    </Button>
                }
            </Col>
        </Row>
    </>)
}
