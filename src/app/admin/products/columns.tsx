import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallback, useMemo } from "react";

const DROPDOWN_ITEMS = [
  { label: "Edit Order", action: () => {} },
  { label: "View Order Details", action: () => {} },
];

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const order = row.original;

      const copyOrderId = useCallback(async () => {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              "text/plain": new Blob([order.id.toString()], { type: "text/plain" }),
            }),
          ]);
        } catch (err) {
          console.error("Failed to copy order ID:", err);
        }
      }, [order.id]);

      const dropdownContent = useMemo(() => (
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={copyOrderId}>
            Copy Order ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {DROPDOWN_ITEMS.map((item, index) => (
            <DropdownMenuItem key={index} onClick={item.action}>
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      ), [copyOrderId]);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu </span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          {dropdownContent}
        </DropdownMenu>
      );
    },
  },
];
