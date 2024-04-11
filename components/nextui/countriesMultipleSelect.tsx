"use client"
import React from "react";
import {Select, SelectItem, Selection} from "@nextui-org/react";
import {countries} from "./countriesData";

export default function CountriesMultipleSelect() {
  const [values, setValues] = React.useState<Selection>(new Set([]));

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        label="Location"
        selectionMode="multiple"
        placeholder="Select countries"
        selectedKeys={values}
        className="max-w-xs"
        onSelectionChange={setValues}
      >
        {countries.map((country, index:number) => (
          <SelectItem key={country.name} value={country.name}>
            {country.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
