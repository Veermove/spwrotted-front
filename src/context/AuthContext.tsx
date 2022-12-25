import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebaseSetup';
import {
    User,
    UserCredential,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';

interface Props {
  children: React.ReactNode;
}

export type AuthContextType = {
    signup: (email: string, password: string) => Promise<UserCredential>;
    login: (email: string, password: string) => Promise<UserCredential>;
    currentUser: User | null;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider: React.FC<Props> = ({children}) => {
    const
        [currentUser, setCurrentUser] = useState<User | null>(null),
        [loading, setLoading] = useState(true);


    function signup(email: string, password: string) {
        return createUserWithEmailAndPassword(
                auth, email, password
            );
    }

    function login(email: string, password: string) {
        return signInWithEmailAndPassword(
            auth, email, password
        );
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe
    }, [])


    const value = {
        currentUser,
        signup,
        login,
    }

    return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
    )
}
