

import { createContext, useContext, useDebugValue, useState } from "react";


const Context = createContext(null);


export const useAuth = () => {
    
    const context = useContext(Context)
    // useDebugValue(auth, auth => user ? "loggedIn" : "Logged Out");
    return context;
};

export function AuthProvider(props) {

    const [user, setUser] = useState({})
    const [token, setToken] = useState(null)


    return (
        <Context.Provider value={{ user, setUser, token, setToken }}>
            {props.children}
        </Context.Provider>
    )
}

