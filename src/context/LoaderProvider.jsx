import { createContext, useContext, useState } from "react";


const Context = createContext();

export const useLoader = () => {
    const loader = useContext(Context);
    return loader;
}

export function LoaderProvider(props) {

    const [loading, setLoading] = useState(false)

    return (
        <Context.Provider value={{ loading, setLoading }}>
            {props.children}
        </Context.Provider>
    )
}
