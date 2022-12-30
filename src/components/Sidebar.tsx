import React from 'react'
import { useAuth } from '../context/AuthContext';
import SidebarLoggedOut from './SidebarLoggedOut';
import { Button } from 'react-bootstrap';

export default function Sidebar() {
    const { loading, logout } = useAuth()!;

    return (<>
        { loading && <SidebarLoggedOut /> }
        { !loading &&
            <Button onClick={async () => await logout()}> Sing out
            </Button> }
    </>);
}
