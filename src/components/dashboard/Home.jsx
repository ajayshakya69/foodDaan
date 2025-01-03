import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useEffect, useState } from "react";
// import { privateAxios } from "@/lib/axios";
import { useLoader } from "@/context/LoaderProvider";
import { useAuth } from "@/context/AuthProvider";
import RequestData from "./datatable/Table";
import useAxiosPrivate from "@/hooks/axiosPrivate";



export default function HomePage() {
    const [requests, setRequests] = useState(null)
    const { setLoading } = useLoader()
    const { user } = useAuth()
    const privateAxios = useAxiosPrivate()


    function fetchRecentRequests() {
        privateAxios
            .get(`/requests/recent/${user.role}/${user.id}`)
            .then(res => { setRequests(res.data) })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }




    useEffect(() => {
        setLoading(true)
        console.log(user)
        if (user) {
            fetchRecentRequests(user)
        }


    }, [user])


    return (
        (<div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>






            <Card className="bg-white bg-opacity-10 text-white">
                <CardHeader>
                    <CardTitle>Recent Food Requests</CardTitle>
                </CardHeader>
                {!!requests && requests.length > 0 ?
                    <RequestData data={requests} updateTableFunc={fetchRecentRequests} page="requests" />
                    :
                    <div className="mx-auto w-full">
                        <h3>No recent requests</h3>
                    </div>
                }
            </Card>
        </div>)
    );
}