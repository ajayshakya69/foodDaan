import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

import { useAuth } from "@/context/AuthProvider";
import { Card, CardContent } from "@/components/ui/card";

export default function RequestData({ requests }) {

    const user = useAuth()

    function updateRequest(event) {
        const requestId = event.target.dataset.requestid;
        const status = event.target.dataset.status;

        console.log('Request ID:', requestId);
        console.log('Status:', status);
    }
    function editRequest(e) {
        console.log(e.target)
    }

    return (
        <div className="hidden md:block">
            <div>
                <CardContent>
                    <div className="md:hidden space-y-4">
                        {requests.map((request) => (
                            <Card key={request._id} className="bg-white bg-opacity-20">
                                <CardContent className="p-4">
                                    <div className="font-bold text-lg">{request.name}</div>
                                    <div>Expiry: {request.expiryDate}</div>
                                    <div>Quantity: {request.quantity}</div>
                                    {(!!user && user.role === "requester") ?
                                        <div className="mt-2">

                                            <Button
                                                variant="secondary"
                                                data-requestid={request._id}
                                                data-status="accepted"
                                                onClick={updateRequest}
                                                size="sm" className="mr-2"
                                            >Accept</Button>
                                            <Button
                                                variant="secondary"
                                                data-requestid={request._id}
                                                data-status="rejected"
                                                size="sm"
                                                onClick={updateRequest}
                                            >Reject</Button>
                                        </div> :
                                        <div className="mt-2">

                                            <Button
                                                variant="secondary"
                                                data-requestid={request._id}
                                                onClick={editRequest}
                                                size="sm" className="mr-2"
                                            >Edit</Button>
                                            <Button
                                                variant="secondary"
                                                data-requestid={request._id}
                                                data-status="cancelled"
                                                onClick={updateRequest}
                                                size="sm"
                                            >Cancel</Button>
                                        </div>

                                    }
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
                                    <TableCell className="font-medium">{request.foodItemId.foodName}</TableCell>
                                    <TableCell>{request.foodItemId.expirationDate}</TableCell>
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
                                            {(!!user && user.role === "requester") ?
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        data-requestid={request._id}
                                                        onClick={editRequest}
                                                    >
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        data-requestid={request._id}
                                                        data-status="cancelled"
                                                        onClick={updateRequest}
                                                    >
                                                        Cancel
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                                :
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        data-requestid={request._id}
                                                        data-status="accepted"
                                                        onClick={updateRequest}
                                                    >
                                                        Accept
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        data-requestid={request._id}
                                                        data-status="rejected"
                                                        onClick={updateRequest}
                                                    >
                                                        Reject
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
        </div>
    )
}


