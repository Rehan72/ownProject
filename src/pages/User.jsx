import { DataTable } from '../components/table/exprt-data-table'
import React, { useState, useEffect } from 'react'
import { fetchData } from "../lib/data"

export default function User() {
  // State to store the fetched data and loading state
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const fetchedData = await fetchData() // Resolving the promise
        setData(fetchedData) // Update state with fetched data
      } catch (error) {
        setError(error) // Set error state if something goes wrong
      } finally {
        setLoading(false) // Set loading to false once the data is fetched
      }
    }

    fetchDataAsync()
  }, []) // Empty dependency array ensures it only runs on mount

  if (loading) {
    return <div>Loading...</div> // Show loading message while data is being fetched
  }

  if (error) {
    return <div>Error: {error.message}</div> // Handle any error that occurred during fetching
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable data={data} /> {/* Render the DataTable with fetched data */}
    </div>
  )
}
