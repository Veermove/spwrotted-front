import { ChangeEvent, FC, MouseEvent, useCallback, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { SPWRUser } from "../../utils/User";
import { UserDetails } from "./UserDetails";
import { getUser, modifyUser } from "../../utils/PermissionServiceClient";
import { useAuth } from "../../context/AuthContext";

export const MenageUsers: FC<{
}> = ({}) => {

    const { currentUser } = useAuth()!;
    const [searchEmail, setSearchEmail] = useState("");

    const updateTextValueFromEvent = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchEmail(e.target.value);
    }, [setSearchEmail]);

    const [searchedUser, setSearchedUser] = useState<SPWRUser | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>("");
    const [adminButtonMessage, setAdminButtonMessage] = useState("Unreachable");

    const fetchUser = useCallback(async () => {
        try {
            const
                token     = await currentUser?.[0].getIdToken()!,
                foundUser = await getUser(searchEmail.trim(), token);

            setSearchedUser(foundUser);
            setAdminButtonMessage(
                foundUser.role === 0
                    ? "Make a moderator"
                    : "Remove moderator"
            )
        } catch (e: any) {
            setErrorMsg(e.message);
        }
    }, [currentUser, searchEmail]);

    const onUserSearchButtonClick = useCallback(async (e: MouseEvent<HTMLButtonElement>) => {
        await fetchUser();
    }, [fetchUser]);

    const onAdminButtonClick = useCallback(async (e: MouseEvent<HTMLButtonElement>) => {
        try {
            const
                token     = await currentUser?.[0].getIdToken()!,
                msg       = await modifyUser(token,
                    searchedUser!.email,
                    searchedUser!.role === 0 ? 1 : 0
                );
                await fetchUser();

        } catch (e: any) {
            setErrorMsg(e.message);
        }
    }, [currentUser, fetchUser, searchedUser]);

    if (!currentUser) {
        return <h1> Log in to see details! </h1>
    }

    if (currentUser[1].role !== 1) {
        return <h1> Looks like you're not a moderator</h1>
    }

    return <>
        <Card>
            <Card.Header
                style={{
                    display: "flex",
                    alignItems: "baseline",
                    flexDirection: "row",
                    columnGap: "10px"
                }}
            >
                <Form.Control
                    type="email"
                    required
                    placeholder="example.user@mail.com"
                    onChange={updateTextValueFromEvent}
                    value={searchEmail}
                />
                <Button
                    onClick={onUserSearchButtonClick}
                > Search </Button>
            </Card.Header>
            <Card.Body>
                {
                    !searchedUser &&
                        <Form.Label>{errorMsg}</Form.Label>
                }
                {
                    searchedUser &&
                        <UserDetails
                            spwrUser={searchedUser!}
                        />
                }
            </Card.Body>
            {
                searchedUser &&
                    <Card.Footer>
                        <Button
                            onClick={onAdminButtonClick}
                        >
                            {adminButtonMessage}
                        </Button>
                    </Card.Footer>
            }
        </Card>

    </>
}
