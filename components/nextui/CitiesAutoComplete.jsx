"use client"
import React, { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { citiesData } from "./citiesData";
import { useFiltersContext } from "@/contexts/filters.context";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";  // Assurez-vous d'avoir cette icône importée

export default function CitiesAutoComplete () {
  const { cities, setCities } = useFiltersContext();
  const [hoveredCity, setHoveredCity] = useState(null);

  const onSelectionChange = (key) => {
    const newCity = key != null ? String(key).trim() : '';
    if (newCity.length > 0 && !cities.includes(newCity)) {
      setCities(prevCities => [...prevCities, newCity]);
    }
  };

  const handleRemoveCity = (city) => {
    setCities(prevCities => prevCities.filter(c => c !== city));
  };

  return (
    <div className="flex flex-col lg:mx-4 max-lg:my-4 md:flex-nowrap gap-4">
      <Autocomplete
        isDisabled
        label="Cities"
        placeholder="Available from May 21"
        className="max-w-xs w-96"
        defaultItems={citiesData}
      >
        {(item) => <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>}
      </Autocomplete>
      <div className="flex items-center flex-wrap">
        {cities.map(city => (
          <div
            key={city}
            onMouseEnter={() => setHoveredCity(city)}
            onMouseLeave={() => setHoveredCity(null)}
            className="relative cursor-pointer"
            onClick={() => handleRemoveCity(city)}
          >
            <Badge className="mx-1">{hoveredCity === city ? <Trash2 color="red" size={16} /> : city}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
