

import { useAuth } from '@/context/AuthProvider'
import { publicAxios } from '@/lib/axios';
import { jwtDecode } from 'jwt-decode'



export default function refreshToken() {

    const { setToken, setUser } = useAuth()

    const refreshToken = async () => {
        const response = await publicAxios.get("/auth/refreshtoken");
        console.log("refreshing token")
        console.log({ response: response.data })
        console.log({ decoded_Data: jwtDecode(response.data.idtoken) })
        setToken(response.data.accessToken)
        localStorage.setItem("user", JSON.stringify(jwtDecode(response.data.idtoken)))

        return response.data.accessToken;
    }

    return refreshToken;

}
