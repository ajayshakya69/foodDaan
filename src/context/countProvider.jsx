
import { useContext, useEffect, useState } from "react";

import Context from "./Context";
import axios from "../lib/axios";


export const useCount = () => {
    const count = useContext(Context)
    return count;
}



export const CountProvider = (props) => {
    const [userCount, setUserCount] = useState({ donor: 10, requester: 15 });

    useEffect(() => {
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
    }, [])

    return (

        <Context.Provider value={{ userCount }}>
            {props.children}
        </Context.Provider>
    )
}