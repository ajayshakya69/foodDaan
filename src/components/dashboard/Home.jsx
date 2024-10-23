import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import { privateAxios } from "@/lib/axios";
import { useLoader } from "@/context/LoaderProvider";
import { useAuth } from "@/context/AuthProvider";
import TableContent from "./datatable/Table";



export default function HomePage({ requestsData }) {
    const [requests, setRequests] = useState(null)
    const { setLoading } = useLoader()
    const user = useAuth()



    useEffect(() => {
        setLoading(true)

        if (user) {
            privateAxios
                .get(`/requests/recent/${user.role}/${user._id}`)
                .then(res => { setRequests(res.data) })
                .catch(err => console.log(err))
                .finally(() => setLoading(false))
        }


    }, [user])

    return (
        (<div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-white bg-opacity-10 text-white">
                    <CardHeader>
                        <CardTitle>Total Donations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">45</div>
                    </CardContent>
                </Card>
                <Card className="bg-white bg-opacity-10 text-white">
                    <CardHeader>
                        <CardTitle>Request Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">120</div>
                    </CardContent>
                </Card>

            </div>
            <Card className="bg-white bg-opacity-10 text-white">
                <CardHeader>
                    <CardTitle>Recent Food Requests</CardTitle>
                </CardHeader>
                {!!requests && requests.length > 0 ?
                    <CardContent>
                        <TableContent requests={requests} />
                        <div className="md:hidden space-y-4">
                            {requestsData.map((request) => (
                                <Card key={request.id} className="bg-white bg-opacity-20">
                                    <CardContent className="p-4">
                                        <div className="font-bold text-lg">{request.name}</div>
                                        <div>Expiry: {request.expiryDate}</div>
                                        <div>Quantity: {request.quantity}</div>
                                        <div className="mt-2">
                                            <Button variant="secondary" size="sm" className="mr-2">View Details</Button>
                                            <Button variant="secondary" size="sm" className="mr-2">Accept</Button>
                                            <Button variant="secondary" size="sm">Decline</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                    :
                    <div className="mx-auto w-full">
                        <h3>No recent requests</h3>
                    </div>
                }
            </Card>
        </div>)
    );
}