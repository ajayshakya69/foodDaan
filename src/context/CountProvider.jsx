
import { useContext, useEffect, useLayoutEffect, useState } from "react";

import { useLoader } from "./LoaderProvider"
import Context from "./CountContext";
import axios from "../lib/axios";


export const useCount = () => {
    const count = useContext(Context)
    return count;
}



export const CountProvider = (props) => {
    const [userCount, setUserCount] = useState({ donor: 10, requester: 15 });
    const loader = useLoader();

    useLayoutEffect(() => {
        loader.setLoading(true);
        axios
            .get("/users/count")
            .then(res => {
                if (res.status === 200) {
                    setUserCount(res.data)
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => loader.setLoading(false))

    }, [])

    return (

        <Context.Provider value={{ userCount }}>
            {props.children}
        </Context.Provider>
    )
}