import { UserCredential } from "firebase/auth"

const permissionSecrets = {
    url: "http://localhost:8080/pwrspotted/api/v1",
    endpoints: {
        create: "/user/create"
    }
}

export const registerUser = async (jwtToken: string, user: UserCredential, name: string, pwrAssoc: [boolean, boolean]) => {
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
