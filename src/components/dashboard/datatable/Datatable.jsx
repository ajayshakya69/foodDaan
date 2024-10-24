import { Label } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { SelectContent } from "@radix-ui/react-select";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import RequestData from "./Table";




export default function DataTable({ requests, title }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  console.log("reqeusts",requests)

  const filteredData = requests.filter((item) =>
  
    item.foodItem.foodName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedStatus === "All" || item.status === selectedStatus));

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);


  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / entriesPerPage); i++) {
    pageNumbers.push(i);
  }

 



  return (
    (<div className="space-y-4">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <Card className="bg-white bg-opacity-5 text-white">
        <CardContent>
          <div className="mb-4 flex flex-wrap items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <Input
                id="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-75" />
            </div>
            <div>
              <Label htmlFor="category" className="sr-only">
                Category
              </Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus} className="capitalize">
                <SelectTrigger className="w-[180px] bg-white bg-opacity-20 text-white">
                  <SelectValue placeholder="Select category" className="capitalize" />
                </SelectTrigger>
                <SelectContent>
                  {['All','accepted','pending','rejected','cancelled'].map((status) => (
                    <SelectItem key={status} value={status} className="capitalize">
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="entries" className="sr-only">
                Entries per page
              </Label>
              <Select
                value={entriesPerPage.toString()}
                onValueChange={(value) => setEntriesPerPage(Number(value))}>
                <SelectTrigger className="w-[180px] bg-white bg-opacity-20 text-white">
                  <SelectValue placeholder="Entries per page" />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 15, 20].map((number) => (
                    <SelectItem key={number} value={number.toString()}>
                      {number} entries
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>


          <RequestData requests={!!requests&&requests} />


          <div className="md:hidden space-y-4">
            {!!requests&&requests.map((request) => (
              <Card key={request._id} className="bg-white bg-opacity-20">
                <CardContent className="p-4">
                  <div className="font-bold text-lg">{request.foodItem.foodName}</div>
                  <div>Expiry: {request.foodItem.expirationDate}</div>
                  <div>Quantity: {request.quantity}</div>
                  <div>Status: {request.status}</div>
                  <div className="mt-2">
                    <Button variant="secondary" size="sm" className="mr-2">Edit</Button>
                    <Button variant="secondary" size="sm">Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredData.length)} of  {filteredData.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}>
                <ChevronLeft className="h-5 w-5 text-black" />
              </Button>
              {pageNumbers.map((number) => (
                <Button

                  key={number}
                  variant={currentPage === number ? "default" : "outline"}
                  size="sm"
                  className={currentPage === number ? "text-white" : "text-black"}
                  onClick={() => setCurrentPage(number)}>
                  {number}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageNumbers.length))}
                disabled={currentPage === pageNumbers.length}>
                <ChevronRight className="h-12 w-12 text-black" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>)
  );
}