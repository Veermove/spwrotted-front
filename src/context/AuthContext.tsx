import React, { useContext, useState } from 'react';
import { auth } from '../firebaseSetup';
import { registerUser } from '../utils/PermissionServiceClient';
import {
    User,
    UserCredential,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    deleteUser,
    signOut,
} from 'firebase/auth';

interface Props {
  children: React.ReactNode;
}

export type AuthContextType = {
    signup: (email: string, password: string, name: string, pwrAssoc: [boolean, boolean]) => Promise<UserCredential | null>;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    currentUser: User | null;
    loading: boolean;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider: React.FC<Props> = ({children}) => {
    const
        [currentUser, setCurrentUser] = useState<User | null>(null),
        [loading, setLoading] = useState(true);


    function signup(email: string, password: string, name: string, pwrAssoc: [boolean, boolean]) {
        return createUserWithEmailAndPassword(
            auth, email, password
        ).then( async (user) => {
            try {

                const ret = await registerUser(user, name, pwrAssoc);
                setCurrentUser(user.user);
                setLoading(false);
                return ret;

            } catch (e) {
                await deleteUser(user.user)
                throw Error("Failed to register user");
            }
        })
    }

    function login(email: string, password: string) {
        return signInWithEmailAndPassword(
            auth, email, password
        ).then((user) => {
            setCurrentUser(user.user);
            setLoading(false);
            return user;
        })
    }

    function logout() {
        setCurrentUser(null);
        setLoading(true);
        return signOut(auth);
    }

    const value = {
        currentUser,
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
