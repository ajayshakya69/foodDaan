

import { useAuth } from '@/context/AuthProvider'
import { publicAxios } from '@/lib/axios';
import { data } from 'autoprefixer';


export default function refreshToken() {

    const { setToken, setUser } = useAuth()

    const refreshToken = async () => {
        const response = await publicAxios.get("/auth/refreshtoken");
        setToken(response.data.accessToken)
        setUser(res.data.user)

        return response.data.accessToken;
    }

    return refreshToken;

}
