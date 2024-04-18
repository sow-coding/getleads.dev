"use client"
import React from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { industriesData } from "./industriesData";
import { useFiltersContext } from "@/contexts/filters.context";

export default function IndustryAutoComplete() {
  const {industries, setIndustries} = useFiltersContext()

  const onSelectionChange = (key) => {
    // Assurer que la clé est une chaîne avant de l'ajouter
    const newIndustry = String(key);

    // Vérifier si la ville est déjà incluse pour éviter les doublons
    if ((newIndustry !== null && !industries.includes(newIndustry))) {
      setIndustries(prevCities => [...prevCities, newIndustry]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Autocomplete
        label="Company's Industry"
        placeholder="Search an industry"
        className="max-w-xs w-96"
        defaultItems={industriesData}
        onSelectionChange={onSelectionChange}
      >
        {(item) => <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>}
      </Autocomplete>
      <p className="mt-1 text-small text-default-500 break-words">Selected industries: {industries.map(industry => <span key={industry}>{industry} </span>)}</p>
    </div>
  );
}
