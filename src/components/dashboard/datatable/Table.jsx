import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

import { useAuth } from "@/context/AuthProvider";

export default function TableContent({ requests }) {

    const user = useAuth()





    return (
        <div className="hidden md:block">
            <div> <Table className="text-lg">
                <TableHeader>
                    <TableRow>
                        <TableHead>Food Name</TableHead>
                        <TableHead >Expiry Date</TableHead>
                        <TableHead >Quantity</TableHead>
                        <TableHead >Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests.map((item) => (

                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.foodItemId.foodName}</TableCell>
                            <TableCell>{item.foodItemId.expirationDate}</TableCell>
                            <TableCell>{item.quantity}</TableCell>

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
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                        :
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Accept</DropdownMenuItem>
                                            <DropdownMenuItem>Reject</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    }
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>
        </div>
    )
}
