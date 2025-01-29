"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { userColumns, teamColumns, projectColumns } from "./columns";

export function DataTable({ data }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [expanded, setExpanded] = React.useState({});

  const table = useReactTable({
    data,
    columns: userColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    getSubRows: (row) => {
      const subRows = [];
      if (row.teams) subRows.push(...row.teams.map((team) => ({ ...team, type: "team", parentId: row.id })));
      if (row.projects)
        subRows.push(...row.projects.map((project) => ({ ...project, type: "project", parentId: row.id })));
      return subRows;
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      expanded,
    },
  });

  const renderSubTable = (row) => {
    const original = row.original;
    if (original.teams) {
      return (
        <DataTableNested
          data={original.teams}
          columns={teamColumns}
          parentId={original.id}
          isSelected={row.getIsSelected()}
          onRowSelectionChange={(newSelection) => {
            const updatedSelection = { ...rowSelection };
            Object.keys(newSelection).forEach((key) => {
              updatedSelection[`${row.id}.${key}`] = newSelection[key];
            });
            setRowSelection(updatedSelection);
          }}
        />
      );
    } else if (original.projects) {
      return (
        <DataTableNested
          data={original.projects}
          columns={projectColumns}
          parentId={original.id}
          isSelected={row.getIsSelected()}
          onRowSelectionChange={(newSelection) => {
            const updatedSelection = { ...rowSelection };
            Object.keys(newSelection).forEach((key) => {
              updatedSelection[`${row.id}.${key}`] = newSelection[key];
            });
            setRowSelection(updatedSelection);
          }}
        />
      );
    }
    return null;
  };

  const getSelectedData = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const selectedData = {};

    const processRow = (row) => {
      const item = row.original;
      if (!selectedData[item.id]) {
        selectedData[item.id] = { ...item, selectedChildren: [] };
      }
      if (row.subRows && row.subRows.length > 0) {
        row.subRows.forEach((subRow) => {
          selectedData[item.id].selectedChildren.push(subRow.original);
        });
      }
    };

    selectedRows.forEach(processRow);
    console.log("Selected Data:", selectedData);
    return selectedData;
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={table.getColumn("name")?.getFilterValue() || ""}
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && (
                    <TableRow>
                      <TableCell colSpan={row.getVisibleCells().length} className="p-0">
                        {renderSubTable(row)}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={userColumns.length} className="h-24 text-center">
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
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function DataTableNested({ data, columns, parentId, isSelected, onRowSelectionChange }) {
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: (updatedSelection) => {
      setRowSelection(updatedSelection);
      onRowSelectionChange(updatedSelection);
    },
    state: { rowSelection },
    enableRowSelection: true,
    enableMultiRowSelection: true,
  });

  React.useEffect(() => {
    if (isSelected) {
      table.toggleAllRowsSelected(true);
    } else {
      table.toggleAllRowsSelected(false);
    }
  }, [isSelected, table]);

  return (
    <div className="rounded-md border-t">
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
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={(isSelected || row.getIsSelected()) && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns?.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
