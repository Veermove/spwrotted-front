import { UserCredential } from "firebase/auth"
import { SPWRUser } from "./User";

const permissionSecrets = {
    url: "http://localhost:8080/pwrspotted/api/v1",
    endpoints: {
        create: "/user/create",
        getUser: (email: string) => `/user/${email}`,
        modify: "/user/modify"
    }
}

export const getUser = async (
    email: string,
    jwtToken: string,
) => {
    const url = permissionSecrets.url + permissionSecrets.endpoints.getUser(email);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
        mode: 'cors',
    });

    if (response.ok) {
        const resp = await response.json();
        return resp.user as SPWRUser;
    }

    throw new Error("Failed to get user");
}

export const registerUser = async (
    jwtToken: string,
    user: UserCredential,
    name: string,
    pwrAssoc: [boolean, boolean]
) => {
    const url = permissionSecrets.url + permissionSecrets.endpoints.create;
    const body = JSON.stringify({
        email: user.user.email,
        name: name,
        pwr_assoc: pwrAssoc,
        role: 0
    });

    console.log(body);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: body,
        mode: 'cors',
    });

    if (response.ok) {
        return user;
    }

    throw new Error("Failed to register user");
}

export const modifyUser = async (
    jwtToken: string,
    email: string,
    role: number
) => {
    const url = permissionSecrets.url + permissionSecrets.endpoints.modify;
    const body = JSON.stringify({
        email: email,
        role: role
    });

    console.log(body);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: body,
        mode: 'cors',
    });

    if (response.ok) {
        return "Change successful";
    }

    throw new Error("Failed to register user");
}
