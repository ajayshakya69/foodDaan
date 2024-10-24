import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

import { useAuth } from "@/context/AuthProvider";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import ConfirmDialog from "@/components/AlertDialog";
import { privateAxios } from "@/lib/axios";
import { useLoader } from "@/context/LoaderProvider";

export default function RequestData({ requests, fetchRecentRequests }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [handlerFunc, setHandlerFunc] = useState()
    const [alertMsg, setAlertMsg] = useState()



    const user = useAuth()
    const { setLoading } = useLoader()

    console.log("requests", requests)

    function updateRequest(requestId, status) {
        setLoading(true)
        privateAxios
            .patch(`/request/update/${requestId}`, {
                status: status
            })
            .then(res => {
                if (res.status === 204) {
                    fetchRecentRequests();
                }
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }


    function editRequest(requestId) {
        console.log("edit", requestId)
    }



    function dialogHandler(id, status) {
        setHandlerFunc(updateRequest(id, status))
        setAlertMsg(`The request will be ${status}`)
    }

    return (
        <div className="hidden md:block">
            <div>
                <CardContent>
                    <div className="md:hidden space-y-4">
                        {requests.map((request) => (
                            <Card key={request._id} className="bg-white bg-opacity-20">
                                <CardContent className="p-4">
                                    <div className="font-bold text-lg">{request.foodItem.foodName}</div>
                                    <div>Expiry: {request.foodItem.foodName}</div>
                                    <div>Quantity: {request.quantity}</div>
                                    {request.status === "pending" && ((!!user && user.role === "requester") ?
                                        <div className="mt-2">

                                            <Button
                                                variant="secondary"
                                                onClick={() => editRequest(request._id)}
                                                size="sm" className="mr-2"
                                            >Edit</Button>
                                            <Button
                                                variant="secondary"
                                                onClick={() => dialogHandler(request._id, "cancelled")}
                                                size="sm"
                                            >Cancel</Button>
                                        </div>
                                        :
                                        <div className="mt-2">

                                            <Button
                                                variant="secondary"
                                                onClick={() => dialogHandler(request._id, "accepted")}
                                                size="sm" className="mr-2"
                                            >Accept</Button>
                                            <Button
                                                onClick={() => dialogHandler(request._id, "rejected")}
                                            >Reject</Button>
                                        </div>


                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <Table className="text-lg">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Food Name</TableHead>
                                <TableHead >Expiry Date</TableHead>
                                <TableHead >Quantity</TableHead>
                                <TableHead >Status</TableHead>
                                <TableHead >Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.map((request) => (


                                <TableRow key={request._id}>
                                    <TableCell className="font-medium">{request.foodItem.foodName}</TableCell>
                                    <TableCell>{request.foodItem.expirationDate}</TableCell>
                                    <TableCell>{request.quantity}</TableCell>

                                    <TableCell className={`status-${request.status}`}>{request.status}</TableCell>

                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <BarChart3 className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            {request.status === "pending" && ((!!user && user.role === "requester") ?
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem

                                                        onClick={() => editRequest(request._id)}
                                                    >
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => dialogHandler(request._id, "cancelled")}
                                                    >
                                                        Cancel
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                                :
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={() => dialogHandler(request._id, "accepted")}
                                                    >
                                                        Accept
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => dialogHandler(request._id, "rejected")}
                                                    >
                                                        Reject
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            )}
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </div>

            <ConfirmDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                handlerFunc={handlerFunc}
                title="Confirm Your Action!"
                message={alertMsg}
            />
        </div>
    )
}


