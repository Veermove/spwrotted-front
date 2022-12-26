import React, { useContext, useState } from 'react';
import { auth } from '../firebaseSetup';
import {
    User,
    UserCredential,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';

interface Props {
  children: React.ReactNode;
}

export type AuthContextType = {
    signup: (email: string, password: string) => Promise<UserCredential>;
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


    function signup(email: string, password: string) {
        return createUserWithEmailAndPassword(
            auth, email, password
        ).then((user) => {
            setCurrentUser(user.user);
            setLoading(false);
            return user;
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
