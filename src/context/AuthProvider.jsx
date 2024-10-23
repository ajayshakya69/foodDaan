

import { createContext, useContext, useEffect, useMemo, useState } from "react";


const Context = createContext(null);


export const useAuth = () => {
    const loader = useContext(Context);
    return loader;
}

export function AuthProvider(props) {

    const [user, setUser] = useState(null)

    const memoizedUser = useMemo(() => user, [user]);
    
    useEffect(() => {
       const userData = JSON.parse(localStorage.getItem("loggingUser"));
        if (userData && (!user || user._id !== userData._id)) { 
            setUser(userData);
        }
        
    }, [user])

    return (
        <Context.Provider value={memoizedUser}>
            {props.children}
        </Context.Provider>
    )
}

