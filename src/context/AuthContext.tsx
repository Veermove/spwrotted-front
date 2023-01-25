import React, { useContext, useState } from 'react';
import { auth } from '../firebaseSetup';
import { getUser, registerUser } from '../utils/PermissionServiceClient';
import {
    User,
    UserCredential,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    deleteUser,
    signOut,
} from 'firebase/auth';
import { SPWRUser } from '../utils/User';

interface Props {
  children: React.ReactNode;
}

export type AuthContextType = {
    signup: (email: string, password: string, name: string, pwrAssoc: [boolean, boolean]) => Promise<UserCredential | null>;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    currentUser: [User, SPWRUser] | null;
    loading: boolean;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider: React.FC<Props> = ({children}) => {
    const
        [currentUser, setCurrentUser] = useState<User | null>(null),
        [currentSpwrUser, setCurrentSpwrUser] = useState<SPWRUser | null>(null),
        [loading, setLoading] = useState(true);


    function signup(email: string, password: string, name: string, pwrAssoc: [boolean, boolean]) {
        return createUserWithEmailAndPassword(
            auth, email, password
        ).then( async (user) => {
            try {
                const
                    token          = await user.user.getIdToken(),
                    registeredUser = await registerUser(token, user, name, pwrAssoc);

                setCurrentUser(user.user);
                setLoading(false);

                // currently every user that registers is created as not an admin
                // to become an admin, one must appoint you
                setCurrentSpwrUser({
                    email,
                    name,
                    pwr_association: pwrAssoc.map(s => s ? 1 : 0),
                    role: 0
                });
                return registeredUser;

            } catch (e) {
                await deleteUser(user.user)
                throw Error("Failed to register user");
            }
        })
    }

    function login(email: string, password: string) {
        return signInWithEmailAndPassword(
            auth, email, password
        ).then( async (user) => {

            try {
                const
                    token      = await user.user.getIdToken(),
                    loggedUser = await getUser(email, token);

                setCurrentSpwrUser(loggedUser)
                setCurrentUser(user.user);
                setLoading(false);
                return user;
            } catch (e) {
                await logout()
                throw Error("Failed to login user");
            }
        })
    }

    function logout() {
        setCurrentUser(null);
        setLoading(true);
        return signOut(auth);
    }

    const value = {
        currentUser: ((currentUser && currentSpwrUser) ? [currentUser!, currentSpwrUser!] : null) as [User, SPWRUser] | null,
        loading,
        signup,
        login,
        logout,
    }

    return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
    )
}
