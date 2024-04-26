"use client"
import React, { useEffect } from "react";
import {Select, SelectItem} from "@nextui-org/react";
import {countriesData} from "./countriesData";
import { useFiltersContext } from "@/contexts/filters.context";

export default function CountriesMultipleSelect() {
  const [values, setValues] = React.useState(new Set([]));
  const {setCountries} = useFiltersContext()

  useEffect(() => {
    // Convertir le Set en tableau
    const selectedCountries = Array.from(values);
    // Mettre à jour le contexte avec ce tableau
    setCountries(selectedCountries);
  }, [values, setCountries]);

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        label="Countries"
        selectionMode="multiple"
        placeholder="Select countries"
        selectedKeys={values}
        className="max-w-xs"
        onSelectionChange={setValues}
      >
        {countriesData.map((country, index) => (
          <SelectItem key={country.name} value={country.name}>
            {country.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
