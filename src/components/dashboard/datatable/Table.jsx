import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

import { useAuth } from "@/context/AuthProvider";
import { Card, CardContent } from "@/components/ui/card";
import { toLocaleString, useState } from "react";
import ConfirmDialog from "@/components/AlertDialog";
import { privateAxios } from "@/lib/axios";
import { useLoader } from "@/context/LoaderProvider";





function formatDate(dbdate) {
    const date = new Date(dbdate);

    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;


    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${String(hours % 12 || 12).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;

    return `${formattedDate}, ${formattedTime}`;
}

export default function RequestData({ data, updateTableFunc, page }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [handlerFunc, setHandlerFunc] = useState()
    const [alertMsg, setAlertMsg] = useState()



    const user = useAuth()
    const { setLoading } = useLoader();

    function updateRequest(requestId, status) {
        setLoading(true)
        privateAxios
            .patch(`/request/update/${requestId}`, {
                status: status
            })
            .then(res => {
                if (res.status === 204) {
                    updateTableFunc();
                }
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }


    function editRequest(requestId) {
    }

    function viewFullRequest(requestId, ...otherParams) {
        const selectedRequest = data.find(request => request._id === requestId)
        console.log("selected request", selectedRequest)

    }

    function dialogHandler(id, status) {
        setHandlerFunc(updateRequest(id, status))
        setAlertMsg(`The request will be ${status}`)
    }

    function editDonation(id) {
        console.log("heelo")
    }

    function viewFullDonationDetail() {
        console.log("view Donation")
    }




    return (
        <div className="hidden md:block">
            <div>
                <CardContent>
                    <div className="md:hidden space-y-4">
                        {data.map((item) => (
                            <Card key={item._id} className="bg-white bg-opacity-20">
                                <CardContent className="p-4">
                                    {page !== "donations" ?
                                        <>

                                            <div className="font-bold text-lg">{item.foodItem.foodName}</div>
                                            <div>Date: {formatDate(item.createdAt)}</div>
                                            <div>Expiry: {item.foodItem.expirationDate}</div>
                                            <div>Quantity: {item.quantity}</div>
                                        </> :
                                        <>
                                            <div className="font-bold text-lg">{item.foodName}</div>
                                            <div>Date: {formatDate(item.createdAt)}</div>
                                            <div>Expiry: {item.expirationDate}</div>
                                            <div>Quantity: {item.quantity}</div>
                                        </>
                                    }

                                    {item.status === "pending" && ((!!user && user.role === "requester") ?
                                        <div className="mt-2">

                                            <Button
                                                variant="secondary"
                                                onClick={() => editRequest(item._id)}
                                                size="sm" className="mr-2"
                                            >Edit</Button>
                                            <Button
                                                variant="secondary"
                                                onClick={() => dialogHandler(item._id, "cancelled")}
                                                size="sm"
                                            >Cancel</Button>
                                        </div>
                                        :
                                        <div className="mt-2">

                                            <Button
                                                variant="secondary"
                                                onClick={() => dialogHandler(item._id, "accepted")}
                                                size="sm" className="mr-2"
                                            >Accept</Button>
                                            <Button
                                                onClick={() => dialogHandler(item._id, "rejected")}
                                            >Reject</Button>
                                        </div>

                                    )}
                                    <div className="mt-2">
                                        <Button
                                            variant="secondary"
                                            size="sm" className="mr-2"
                                        >View Full detail</Button>

                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <Table className="text-lg">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Food Name</TableHead>
                                <TableHead >Date</TableHead>
                                <TableHead >Expiry Date</TableHead>
                                <TableHead >Quantity</TableHead>
                                <TableHead >{page === "requests" ? "Status" : "Availabelity"}</TableHead>
                                <TableHead >Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item) => (


                                <TableRow key={item._id}>
                                    {
                                        page !== "donations" ?
                                            <>
                                                <TableCell className="font-medium">{item.foodItem.foodName}</TableCell>
                                                <TableCell>{formatDate(item.createdAt)}</TableCell>
                                                <TableCell>{item.foodItem.expirationDate}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>

                                                <TableCell className={`status-${item.status}`}>{item.status}</TableCell>
                                            </>
                                            :
                                            <>
                                                <TableCell className="font-medium">{item.foodName}</TableCell>
                                                <TableCell>{formatDate(item.createdAt)}</TableCell>
                                                <TableCell>{item.expirationDate}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>

                                                <TableCell className={`status-${item.isAvailable}`}>{item.isAvailable ? "yes" : "no"}</TableCell>
                                            </>

                                    }
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <BarChart3 className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            {
                                                page === "requests" ?

                                                    <DropdownMenuContent align="end">
                                                        {item.status === "pending" && ((!!user && user.role === "requester") ?
                                                            <>

                                                                <DropdownMenuItem

                                                                    onClick={() => editRequest(item._id)}
                                                                >
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => dialogHandler(item._id, "cancelled")}
                                                                >
                                                                    Cancel
                                                                </DropdownMenuItem>
                                                            </>

                                                            :
                                                            <>

                                                                <DropdownMenuItem
                                                                    onClick={() => dialogHandler(item._id, "accepted")}
                                                                >
                                                                    Accept
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => dialogHandler(item._id, "rejected")}
                                                                >
                                                                    Reject
                                                                </DropdownMenuItem>
                                                            </>
                                                        )}
                                                        <DropdownMenuItem
                                                            onClick={() => viewFullRequest(item._id, "accepted")}
                                                        >
                                                            View Full Detail
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                    :
                                                    <DropdownMenuContent align="end">
                                                        {item.isAvailable && ((!!user && user.role === "donor") &&
                                                            <>

                                                                <DropdownMenuItem

                                                                    onClick={() => editDonation(item._id)}
                                                                >
                                                                    Edit
                                                                </DropdownMenuItem>

                                                            </>


                                                        )}
                                                        <DropdownMenuItem
                                                            onClick={() => viewFullDonationDetail(item._id, "accepted")}
                                                        >
                                                            View Full Detail
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>

                                            }
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


