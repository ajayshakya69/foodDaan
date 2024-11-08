

import { privateAxios } from "@/lib/axios";
import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";


const Context = createContext(null);


export const useAuth = () => { return useContext(Context) };

export function AuthProvider(props) {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState()


    const memoizedUser = useMemo(() => user, [user]);


    useEffect(() => {

        try {
            privateAxios.get("/auth/me")
                .then(res => {
                    setToken(res.data.accessToken)
                    setUser(jwtDecode(res.data.idToken))
                })
        } catch (error) {
            setToken(null)
        }

    }, [token])



    useLayoutEffect(() => {
        const authRequestIntercepter = privateAxios.interceptors.request.use(
            (config) => {
                console.log("comes in auth request")
                token && !config.retry
                    ? config.headers['Authorization'] = `Bearer ${token}`
                    : config.headers.Authorization
                return config;
            }
        )

        return () => {
            privateAxios.interceptors.request.eject(authRequestIntercepter)
        }
    }, [token])


    useLayoutEffect(() => {
        const authResponseIntercepter = privateAxios.interceptors.response.use(
            (response) => response,
            (error) => {
                const originalRequest = error.config;

                if (error.response.status === 403 && error.respons.data.message === "Unauthorized") {
                    try {
                        originalRequest.retry = true;
                        console.log("comes in auth response")
                        const response = privateAxios.get("/auth/refreshtoken");
                        setToken(response.data.accessToken);
                        originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
                        return privateAxios(originalRequest)
                    } catch (error) {
                        setToken(null)
                    }
                }
                return Promise.reject(error)

            }
        )

        return () => {
            privateAxios.interceptors.response.eject(authResponseIntercepter)
        }
    }, [token])


    return (
        <Context.Provider value={memoizedUser}>
            {props.children}
        </Context.Provider>
    )
}

