"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MessageLog } from "../alerts"

export const columns: ColumnDef<MessageLog>[] = [
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "content",
    header: "Content",
  }
]
