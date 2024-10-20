
import { createContext, useContext, useState } from "react";


const Context = createContext(null);

export const useLoader = () => {
    const loader = useContext(Context);
    return loader;
}

export function LoaderProvider(props) {



    return (
        <Context.Provider value={{ loading, setLoading }}>
            {props.children}
        </Context.Provider>
    )
}

