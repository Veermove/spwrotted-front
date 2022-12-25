import React, { useContext, useState, useEffect } from 'react';
import { authContext } from '../firebaseSetup';
import { User, UserCredential } from 'firebase/auth';

interface Props {
  children: React.ReactNode;
}

export type AuthContextType = {
    signup: (email: string, password: string) => Promise<UserCredential>;
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
        return authContext.createUserWithEmailAndPassword(
                authContext.auth,
                email, password
            );
    }

    useEffect(() => {
        const unsubscribe = authContext.auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe
    }, [])


    const value = {
        currentUser,
        signup
    }

    return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
    )
}
