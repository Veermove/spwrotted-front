import React, { useState } from 'react'
import { Nav, Button } from "react-bootstrap";
import Login from "./Login";
import Signup from "./Signup";

export type StateSetter = React.Dispatch<React.SetStateAction<boolean>>;

export default function SidebarLoggedOut() {
    const [loginToggled, setLoginToggled] = useState(true);

    return (
        <>
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
                activeKey="/home"
                onSelect={selectedKey => alert(`selected ${selectedKey}`)}>
                <div className="sidebar-sticky"></div>
                    <Nav.Item>
                        {!loginToggled && (<>
                            <Signup/>
                            <div className="w-100 text-center mt-2">
                                Already have an account?
                                <Button onClick={() => { setLoginToggled(true); }}>
                                    Log in
                                </Button>
                            </div>
                        </>)}
                        {loginToggled && (<>
                            <Login/>
                            <div className="w-100 text-center mt-2">
                                Need an account?
                                <Button onClick={() => { setLoginToggled(false);}}>
                                    Sign up
                                </Button>
                            </div>
                        </>)}
                    </Nav.Item>
            </Nav>
        </>
    )
}
