import React, { useState } from "react"
import { useReactTable, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { columns as defaultColumns } from "./columns"

export function DataTable({ data }) {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [expanded, setExpanded] = useState({})

  // Define the functions before passing to columns
  const updateChildrenSelection = (row, isSelected) => {
    row.subRows?.forEach((subRow) => {
      subRow.toggleSelected(isSelected)
      if (subRow.getCanExpand()) {
        updateChildrenSelection(subRow, isSelected)
      }
    })
  }

  const updateParentSelection = (row) => {
    // If the row has a parent (i.e., it's a child row), update the parent checkbox
    const parentRow = row.getParentRow();
  
    if (parentRow) {
      // Check if all sub-rows are selected
      const allChildrenSelected = parentRow.subRows.every(subRow => subRow.getIsSelected());
      const someChildrenSelected = parentRow.subRows.some(subRow => subRow.getIsSelected());
  
      if (allChildrenSelected) {
        // All child rows are selected, so mark the parent as checked
        parentRow.toggleSelected(true);
      } else if (!someChildrenSelected) {
        // No child rows are selected, so mark the parent as unchecked
        parentRow.toggleSelected(false);
      } else {
        // Some child rows are selected, so mark the parent as indeterminate
        parentRow.toggleSelected(true);
      }
  
      // Recursively update the parent
      updateParentSelection(parentRow);
    }
  };

  // Modify columns to include updateChildrenSelection and updateParentSelection
  const columns = defaultColumns.map((column) => {
    if (column.cell) {
      return {
        ...column,
        cell: ({ row }) => {
          return column.cell({
            row,
            updateChildrenSelection,
            updateParentSelection,
          })
        },
      }
    }
    return column
  })

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.members,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      expanded,
    },
  })

  const getSelectedData = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows
    const selectedData = selectedRows.map((row) => {
      const userData = row.original
      const selectedMembers = userData.members.filter((_, index) => row.subRows?.[index]?.getIsSelected())
      return { ...userData, members: selectedMembers }
    })
    console.log("Selected Data:", selectedData)
    return selectedData
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() ?? "")}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <Button onClick={getSelectedData} className="ml-4">
          Get Selected Data
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {cell.column.id === "select"
                          ? flexRender(cell.column.columnDef.cell, {
                              ...cell.getContext(),
                              updateChildrenSelection,
                              updateParentSelection,
                            })
                          : flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="p-0">
                        <Table>
                          <TableBody>
                            {row.subRows.map((subRow) => (
                              <TableRow key={subRow.id} data-state={subRow.getIsSelected() && "selected"}>
                                {subRow.getVisibleCells().map((cell) => (
                                  <TableCell key={cell.id}>
                                    {cell.column.id === "select"
                                      ? flexRender(cell.column.columnDef.cell, {
                                          ...cell.getContext(),
                                          updateChildrenSelection,
                                          updateParentSelection,
                                        })
                                      : flexRender(cell.column.columnDef.cell, cell.getContext())}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
