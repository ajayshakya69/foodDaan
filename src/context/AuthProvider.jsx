

import { createContext, useContext, useDebugValue, useEffect, useState } from "react";


const Context = createContext(null);


export const useAuth = () => {

    const { user } = useContext(Context)
    useDebugValue(user, user => user ? "loggedIn" : "Logged Out");
    return useContext(Context);
};

export function AuthProvider(props) {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"))
    

        setUser(savedUser)
    }, [])

    return (
        <Context.Provider value={{ user, setUser, token, setToken }}>
            {props.children}
        </Context.Provider>
    )
}

