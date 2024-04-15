"use client"
import React, { Key } from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { citiesData } from "./citiesData";
import { useFiltersContext } from "@/contexts/filters.context";
//prendre data de l'API GeoNames
export default function CitiesAutoComplete() {
  const {cities, setCities} = useFiltersContext()

  const onSelectionChange = (key) => {
    // Assurer que la clé est une chaîne avant de l'ajouter
    const newCity = String(key);

    // Vérifier si la ville est déjà incluse pour éviter les doublons
    if (newCity && !cities.includes(newCity)) {
      setCities(prevCities => [...prevCities, newCity]);
    }
  };

  return (
    <div className="flex flex-col lg:mx-4 max-lg:my-4 md:flex-nowrap gap-4">
      <Autocomplete
        label="Cities"
        placeholder="Search cities"
        className="max-w-xs w-96"
        defaultItems={citiesData}
        onSelectionChange={onSelectionChange}
      >
        {(item) => <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>}
      </Autocomplete>
      <p className="mt-1 text-small text-default-500 break-words">Selected cities: {cities.map(city => <span key={city}>{city} </span>)}</p>
    </div>
  );
}
