import React from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {citiesData} from "./citiesData";

export default function CitiesAutoComplete() {
  return (
    <div className="flex w-1/3 max-lg:w-full flex-col lg:mx-4 max-lg:my-4 md:flex-nowrap gap-4">
        <Autocomplete
        defaultItems={citiesData}
        label="Favorite Animal"
        placeholder="Search an animal"
        className="max-w-xs"
        >
        {(city) => <AutocompleteItem key={city.name}>{city.name}</AutocompleteItem>}
        </Autocomplete>
    </div>
  );
}
