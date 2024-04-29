"use client"
import React, { useEffect } from "react";
import {Select, SelectItem, Selection} from "@nextui-org/react";
import { employessData } from "./employeesData";
import { useFiltersContext } from "@/contexts/filters.context";
export default function EmployeesMultipleSelect() {
  const [values, setValues] = React.useState(new Set([]));
  const {setSizes} = useFiltersContext()
  
  useEffect(() => {
    // Convertir le Set en tableau
    const selectedSizes = Array.from(values);
    // Mettre à jour le contexte avec ce tableau
    setSizes(selectedSizes);
  }, [values, setSizes]);

  return (
    <div className="flex w-1/3 max-lg:w-full max-w-xs flex-col gap-2">
      <Select
        isRequired
        label="Size"
        selectionMode="multiple"
        placeholder="Select intervals"
        selectedKeys={values}
        className="max-w-xs"
        onSelectionChange={setValues}
      >
        {employessData.map((employees) => (
          <SelectItem key={employees.apinumber} value={employees.apinumber}>
            {employees.number}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
