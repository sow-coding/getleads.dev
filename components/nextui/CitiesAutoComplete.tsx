"use client"
import React from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { citiesData } from "./citiesData";
//prendre data de l'API GeoNames
export default function CitiesAutoComplete() {
  return (
    <div className="flex flex-wrap lg:mx-4 max-lg:my-4 md:flex-nowrap gap-4">
      <Autocomplete
        label="Cities"
        placeholder="Search cities"
        className="max-w-xs w-96"
        defaultItems={citiesData}
      >
        {(item) => <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>}
      </Autocomplete>
    </div>
  );
}
