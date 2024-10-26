import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useEffect, useState } from "react";
import { privateAxios } from "@/lib/axios";
import { useLoader } from "@/context/LoaderProvider";
import { useAuth } from "@/context/AuthProvider";
import RequestData from "./datatable/Table";



export default function HomePage() {
    const [requests, setRequests] = useState(null)
    const { setLoading } = useLoader()
    const user = useAuth()


    function fetchRecentRequests() {
        privateAxios
            .get(`/requests/recent/${user.role}/${user._id}`)
            .then(res => { setRequests(res.data) })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }




    useEffect(() => {
        setLoading(true)

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
                    <RequestData data={requests} updateTableFunc={fetchRecentRequests}/>
                    :
                    <div className="mx-auto w-full">
                        <h3>No recent requests</h3>
                    </div>
                }
            </Card>
        </div>)
    );
}