import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../bd";

const authContext = createContext();

export const useAuth = () =>{
    const context = useContext(authContext)
    if (!context) throw new Error('No existe ningun provedor de auntenticación');
    return context;
}

export function AuthProvider({children}) {

    const [loading, setLoading] = useState(null);
    const [user, setUser] = useState(null); 

    const signup = (email, password) => {

        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn =(email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const logOut = () =>{
        signOut(auth);
    }
    return <authContext.Provider value={{signup, signIn, user, logOut, loading}}>{children}</authContext.Provider>
}