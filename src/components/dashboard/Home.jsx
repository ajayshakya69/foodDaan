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
import { useEffect } from "react";
import { parse } from "postcss";
import { privateAxios } from "@/lib/axios";



export default function HomePage({ requestsData }) {
    const [user, setUser] = useState(second)

    useEffect(() => {
        privateAxios
        .get

    })

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
                <CardContent>
                    <div className="hidden md:block">
                        <Table className="text-lg">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Food Name</TableHead>
                                    <TableHead>Expiry Date</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {requestsData.slice(0, 3).map((request) => (
                                    <TableRow key={request.id}>
                                        <TableCell className="font-medium">{request.name}</TableCell>
                                        <TableCell>{request.expiryDate}</TableCell>
                                        <TableCell>{request.quantity}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <BarChart3 className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem>Accept Request</DropdownMenuItem>
                                                    <DropdownMenuItem>Decline Request</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="md:hidden space-y-4">
                        {requestsData.slice(0, 3).map((request) => (
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
            </Card>
        </div>)
    );
}