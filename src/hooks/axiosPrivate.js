import { useAuth } from "@/context/AuthProvider"
import refreshToken from "./refreshToken";
import { useEffect } from "react";
import { privateAxios } from "@/lib/axios";



export default function useAxiosPrivate() {
    const { token } = useAuth();
    const refresh = refreshToken();


    useEffect(() => {
        const requestIntercepter = privateAxios.interceptors.request.use(
            (config) => {
                console.log("in request intercepter")
                if (!config.retry && token)
                    config.headers['Authorization'] = `Bearer ${token}`
                return config;

            }
            , (error) => Promise.reject(error)
        )

        const responseIntercepter = privateAxios.interceptors.response.use(response => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.config.status === 403 && error.config.data.message === "Unauthorized") {
                    config.retry = true;
                    const newAccessToken = await refresh();
                    config.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return originalRequest;
                }
                return Promise.reject(error)
            }
        )
        return () => {
            privateAxios.interceptors.request.eject(requestIntercepter)
            privateAxios.interceptors.response.eject(responseIntercepter)
        }


    }, [token, refresh])

    return privateAxios

}
