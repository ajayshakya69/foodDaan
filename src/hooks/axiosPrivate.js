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
                
                if (!config.retry && token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;

            }
            , (error) => Promise.reject(error)
        )

        const responseIntercepter = privateAxios.interceptors.response.use(response => response,
            async (error) => {
                const originalRequest = error.config;
                console.log("in response")
                if (error.response.status === 403 && error.response.data.message === "Unauthorized") {
                    console.log("updating")
                    originalRequest.retry = true;
                    const newAccessToken = await refresh();
                    console.log({newAccessToken})
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return privateAxios(originalRequest);
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
