import { Row, Col } from "react-bootstrap";

import Sidebar from './Sidebar';
import { MainColumn } from "./Dashboard/MainColumn";

export default function PageSpanner() {
    return (<>
        <Row>
            <Col xs={2} id="sidebar-wrapper-left">
            </Col>
            <Col xs={8} id="page-content-wrapper">
                <MainColumn />
            </Col>
            <Col xs={2} id="sidebar-wrapper">
                <Sidebar />
            </Col>
        </Row>
    </>)
}


