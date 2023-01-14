import React from 'react'
import { useAuth } from '../context/AuthContext';
import SidebarLoggedOut from './SidebarLoggedOut';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isUserAdimn } from '../utils/User';

export default function Sidebar() {
    const { loading, logout, currentUser } = useAuth()!;

    if (loading) {
        return <SidebarLoggedOut />;
    }

    return (<>
        <Card style={{ width: '18rem' }}>
            <Card.Body
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px"
                }}
            >
                <Link to="/profile">
                    <Button>
                        Your profile
                    </Button>
                </Link>
                <Link to="/">
                    <Button>
                        Main page
                    </Button>
                </Link>
                {
                    isUserAdimn(currentUser?.[1]) && (<>
                    <Link to="/manageUsers">
                        <Button>
                            Manage Users
                        </Button>
                    </Link>
                    <Link to="/moderate">
                        <Button>
                            Moderate posts
                        </Button>
                    </Link>
                    </>)
                }

            </Card.Body>
            <Card.Footer
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center"
                }}
            >
                <Button
                    style={{
                        width: "fit-content"
                    }}
                    onClick={async () => await logout()}
                >
                    Sing out
                </Button>
            </Card.Footer>
        </Card>
    </>);
}
