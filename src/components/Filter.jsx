import React, { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";

export function DataTableFilter({ filters, onApplyFilters, onResetFilters, onCancelFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({});

  const handleFilterChange = (filterName, value) => {
    setFilterValues((prev) => ({ ...prev, [filterName]: value }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filterValues);
    setIsOpen(false);
  };

  const handleResetFilters = () => {
    setFilterValues({});
    onResetFilters();
    setIsOpen(false);
  };

  const handleCancelFilters = () => {
    onCancelFilters();
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="bg-[#1a1a40] text-white border-r-2 border-[rgba(92,92,153,0.8)] flex items-center px-4 py-2 rounded-lg hover:bg-[#151535] transition-colors duration-300">
          <Filter size={24} className="mr-2" />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-[#5c5c99] p-6 rounded-lg shadow-lg">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-xl font-semibold text-white">Filter Data</SheetTitle>
          <SheetDescription className="text-sm text-gray-300">
            Apply filters to the data table. Click apply when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          {filters.map((filter) => (
            <div key={filter.name} className="space-y-4">
              <h4 className="text-lg font-medium text-white">{filter.name}</h4>
              <Select
                value={filterValues[filter.name] || ""}
                onValueChange={(value) => handleFilterChange(filter.name, value)}
              >
                <SelectTrigger className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder={`Select ${filter.name.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a40] shadow-lg rounded-lg">
                  {filter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-sm text-white">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={handleResetFilters} className="px-4 py-2 rounded-lg text-[#1a1a40] border-[#1a1a40] ">
            Reset
          </Button>
          <Button onClick={handleApplyFilters} className="bg-[#1a1a40] text-white px-4 py-2 rounded-lg hover:bg-[#151535]">
            Apply Filters
          </Button>
          
        </div>
      </SheetContent>
    </Sheet>
  );
}
