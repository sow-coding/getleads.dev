"use client"
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button} from "@nextui-org/react";
import {columns} from "./resultsTableData";
import { useRouter } from "next/navigation";

export function ResultsTable ({ organizations }) {
  const router = useRouter()
  const renderCell = React.useCallback((organization, columnKey) => {
  const cellValue = organization[columnKey];  
    switch (columnKey) {
      case "name":
        return (
          <h3>{organization.properties.identifier.value}</h3>
        );
      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">{organization.properties.short_description}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Button shadow color="success" auto onPress={() => {
              router.push(`/search/organization?uuid=${organization.uuid}`)
            }}>
              Details
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, [router]);

  return (
  <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={organizations}>
        {(item) => (
          <TableRow key={item.uuid}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
