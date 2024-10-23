import { Input } from "../../ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { Label } from "@radix-ui/react-dropdown-menu";


export default function Filter({searchTerm,setSearchTerm,selectedCategory,setSelectedCategory}) {
    return (
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
                    status
                </Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px] bg-white bg-opacity-20 text-white">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                       
                            <SelectItem  value="appproved">
                                Approved
                            </SelectItem>
                            <SelectItem  value="appproved">
                                Pending
                            </SelectItem>
                            <SelectItem  value="appproved">
                               Rejected
                            </SelectItem>
                      
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

    )
}
