import { FC } from "react";
import { useAuth } from "../../context/AuthContext";
import { UserDetails } from "./UserDetails";

export const YourProfile: FC<{
}> = ({}) => {
    const { currentUser } = useAuth()!;
    if (!currentUser) {
        return <h1>Log in to see your details</h1>
    }
    return <>
        <UserDetails spwrUser={currentUser[1]} />
    </>
}
