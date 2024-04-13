"use client"
import React from "react";
import {Select, SelectItem, Selection} from "@nextui-org/react";
import { employessData } from "./employeesData";
export default function EmployeesMultipleSelect() {
  const [values, setValues] = React.useState<Selection>(new Set([]));

  return (
    <div className="flex w-48 max-w-xs flex-col gap-2">
      <Select
        label="Size"
        selectionMode="multiple"
        placeholder="Select intervals"
        selectedKeys={values}
        className="max-w-xs"
        onSelectionChange={setValues}
      >
        {employessData.map((employees) => (
          <SelectItem key={employees.apinumber} value={employees.number}>
            {employees.number}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
