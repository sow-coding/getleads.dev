import React from "react";
import {Select, SelectItem} from "@nextui-org/react";
import { citiesData } from "./citiesData";
import { useFiltersContext } from "@/contexts/filters.context";

export default function CitiesSelect() {
    const {setCities} = useFiltersContext()

    const onSelectionChange = (key) => {
      const newCities = Array.from(key);
      setCities(newCities)
    }
    
  return (
    <Select
      label="Cities"
      placeholder="Select cities"
      selectionMode="multiple"
      className="max-w-xs mx-4"
      onSelectionChange={onSelectionChange}
    >
      {citiesData.map((city) => (
        <SelectItem key={city.name} value={city.name}>
          {city.name}
        </SelectItem>
      ))}
    </Select>
  );
}
