
import { privateAxios } from "@/lib/axios";
import { createContext, useContext, useEffect, useState } from "react";


const Context = createContext(null);


export const useAuth = () => {
    const loader = useContext(Context);
    return loader;
}

export function AuthProvider(props) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('loggingUser'));
        setUser(userData);

          
           
    }, [])

    return (
        <Context.Provider value={user}>
            {props.children}
        </Context.Provider>
    )
}

