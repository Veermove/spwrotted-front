import { Row, Col } from "react-bootstrap";

import Sidebar from './Sidebar';
import { MainColumn } from "./Dashboard/MainColumn";
import { Outlet, Route, Routes } from "react-router-dom";
import PageMissing from "./common/PageMissing";

export default function PageSpanner() {
    return (<>
        <Row>
            <Col id="sidebar-wrapper-left">
            </Col>
            <Col xs={8} id="page-content-wrapper">
                <Outlet />
            </Col>
            <Col id="sidebar-wrapper">
                <Sidebar />
            </Col>
        </Row>
    </>)
}
