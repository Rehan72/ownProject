"use client"

import { ArrowUpDown, MoreHorizontal, ChevronRight, ChevronDown, Eye } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Checkbox } from "../../components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"


const handleClickAction = (id) => {
  //handleClickAction(id)
  alert(`Clicked action for user ID: ${id}`)
}
export const columns = [

  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row, updateChildrenSelection, updateParentSelection }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value); // Toggle the selected state of the child row
      
            // Update children selection (this handles checking/unchecking based on parent-child hierarchy)
            updateChildrenSelection(row, !!value);
      
            // After the child is toggled, immediately check if the parent needs to be updated
            updateParentSelection(row);
          }}
          aria-label="Select row"
          ref={(checkbox) => {
            // Set the indeterminate state for the parent checkbox
            if (checkbox) {
              checkbox.indeterminate = row.getIsSomeSelected() && !row.getIsSelected();
            }
          }}
        />
      ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <Button variant="ghost" onClick={row.getToggleExpandedHandler()} className="p-0 w-6 h-6">
          {row.getIsExpanded() ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      ) : null
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "lastLogin",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Last Login
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("lastLogin")}</div>,
  },
  {
    accessorKey: "Action",
    cell: ({ row }) => {
      const user = row.original

      return (
        <div onClick={() => handleClickAction(user.id)}>
          <Eye/>
        </div>
      )
    },
  },
]

export const childColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row, updateChildrenSelection, updateParentSelection }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value)
          updateChildrenSelection(row, !!value) // Update children when the checkbox is clicked
          updateParentSelection(row) // Update parent when the checkbox is clicked
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
]
