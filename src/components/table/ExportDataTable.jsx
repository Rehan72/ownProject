"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

// Sample Data with Nested Structure
const data = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    subRows: [
      { id: 101, name: "Sub-John 1", email: "subjohn1@example.com", status: "Pending" },
      { id: 102, name: "Sub-John 2", email: "subjohn2@example.com", status: "Completed" },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Inactive",
    subRows: [
      { id: 201, name: "Sub-Jane 1", email: "subjane1@example.com", status: "Active" },
    ],
  },
];

// Column Definition
const columns = [
  {
    id: "select",
    header: () => <Checkbox aria-label="Select all" />,
    cell: ({ row }) => {
      const isParent = row.original.subRows?.length > 0;
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);

            // Auto-check/uncheck all child rows if parent row is toggled
            if (isParent) {
              row.original.subRows.forEach((subRow) => row.toggleSelected(!!value, subRow.id));
            }
          }}
          aria-label="Select row"
        />
      );
    },
  },
  {
    id: "expand",
    header: () => null,
    cell: ({ row }) =>
      row.original.subRows?.length > 0 ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => row.toggleExpanded()}
          aria-label="Expand row"
        >
          {row.getIsExpanded() ? <ChevronDown /> : <ChevronRight />}
        </Button>
      ) : null,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => info.getValue(),
  },
];

export function DataTable({ tableData = data, isNested = false }) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [expanded, setExpanded] = React.useState({});

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      rowSelection,
      expanded,
    },
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows || [],
  });

  return (
    <Table className={`border ${isNested ? "bg-gray-100 p-2 rounded-lg" : ""}`}>
      {!isNested && (
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
      )}
      <TableBody>
  {table.getRowModel().rows.map((row) => (
    <React.Fragment key={row.id ?? row.index}>
      {/* Main Row */}
      {!isNested || !row.original.subRows ? (
        <TableRow>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ) : null}

      
    </React.Fragment>
  ))}
</TableBody>
    </Table>
  );
}
