import { useContext, useState } from "react";
import loaderContext from "./LoaderContext";


export const useLoader = () => {
    const loader = useContext(loaderContext);
    return loader;
}

export function LoaderProvider(props) {

    const [loading, setLoading] = useState(false)

    return (
        <loaderContext.Provider value={{ loading, setLoading }}>
            {props.children}
        </loaderContext.Provider>
    )
}
