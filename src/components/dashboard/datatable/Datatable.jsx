import { Label } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { SelectContent } from "@radix-ui/react-select";

import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import RequestData from "./Table";
import DynamicPagination from "@/components/dashboard/datatable/DynamicPagination";
import { useNavigate } from "react-router-dom";





export default function DataTable({ data, title, updateTableFunc, page }) {
  const navigate = useNavigate();


  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [pages, setPages] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);



  const filteredData = data.filter((item) => {
    // Determine the search field based on the page type
    const searchField = page === "donations" ? item.foodName : item.foodItem.foodName;

    // Perform the filtering based on search term and selected status
    return (
      searchField.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedStatus === "All" || item.status === selectedStatus)
    );
  });






  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);


  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / entriesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
  };


  useEffect(() => {
    setPages(Math.ceil(filteredData.length / entriesPerPage))
  }, [filteredData])

  useEffect(() => {
    setCurrentPage(1)

  }, [entriesPerPage])


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
            {page === "requests" &&
              <div>
                <Label htmlFor="category" className="sr-only">
                  Category
                </Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus} className="capitalize">
                  <SelectTrigger className="w-[180px] bg-white bg-opacity-20 text-white">
                    <SelectValue placeholder="Select category" className="capitalize" />
                  </SelectTrigger>
                  <SelectContent>
                    {['All', 'accepted', 'pending', 'rejected', 'cancelled'].map((status) => (
                      <SelectItem key={status} value={status} className="capitalize">
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            }
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


          <RequestData data={!!data && currentEntries} selectedStatus={selectedStatus} updateTableFunc={updateTableFunc} page={page} />

          {/* 
          <div className="md:hidden space-y-4">s
            {
              !!data && data.map((request) => (
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
              ))
            }
          </div> */}

          <div className="mt-4 flex items-center justify-between">
            <div>
              Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredData.length)} of  {filteredData.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <DynamicPagination
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                totalPages={pages}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>)
  );
}