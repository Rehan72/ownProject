import { DataTable } from '../components/table/exprt-data-table'
import React, { useState, useEffect, useCallback } from 'react'
import { fetchData } from "../lib/data"
import Loader from '../components/Loader'
import { Card, CardContent, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Download, Filter } from 'lucide-react'
import { DataTableFilter } from '../components/Filter'

export default function User() {
  // State to store the fetched data and loading state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columnFilters, setColumnFilters] = useState({});
  const [error, setError] = useState(null)
  const [selectedData, setSelectedData] = useState([])

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedData = await fetchData();
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setError(error)
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

 
  const handleApplyFilters = useCallback((filters) => {
    setColumnFilters(filters);
    console.log(filters,"Filters");
    
  }, []);

  const handleResetFilters = useCallback(() => {
    setColumnFilters({});
  }, []);

  if (loading) {
    return <div><Loader/></div> // Show loading message while data is being fetched
  }

  if (error) {
    return <div>Error: {error.message}</div> // Handle any error that occurred during fetching
  }
  
  const filterConfig = [
    {
      name: "Role",
      options: [
        { label: "Admin", value: "Admin" },
        { label: "User", value: "User" },
        { label: "Manager", value: "Manager" },
      ],
    },
    {
      name: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  ]

  console.log(selectedData,"Selected Data");
  
// console.log(filteredData,"++++++++++++++");
  return (
    <div className="container mx-auto py-10">
      <Card className="space-y-6 space-x-6">
      <CardTitle className="text-center text-lg font-semibold mb-4">
          Export Print Data
        </CardTitle>
        <div className="flex justify-end space-x-4 mb-4">
      <Button className="bg-[#1a1a40] text-white border-2 border-[rgba(92,92,153,0.8)]">
        <Download size={24}/>
        Download Data
      </Button>
      <DataTableFilter filters={filterConfig} onApplyFilters={handleApplyFilters} onResetFilters={handleResetFilters} />
      {/* <Button className="bg-[#1a1a40] text-white border-2 border-[rgba(92,92,153,0.8)] flex items-center">
        <Filter size={24} className="mr-2" />
        Filter
      </Button> */}
    </div>
        <CardContent>
        <DataTable data={data} columnFilters={columnFilters} onSelectionChange={setSelectedData} />
      </CardContent>
      </Card>
       
    </div>
  )
}
