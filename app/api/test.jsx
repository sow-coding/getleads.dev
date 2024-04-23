"use client"
import React, { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { Badge, Tooltip } from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { useFiltersContext } from "@/contexts/filters.context";

export default function CitiesAutoComplete() {
  const { cities, setCities } = useFiltersContext();

  let list = useAsyncList({
    async load({ signal, filterText }) {
      if (!filterText.trim().length) return { items: [] };
      let url = `http://api.geonames.org/searchJSON?q=${encodeURIComponent(filterText)}&maxRows=10&username=saikou&cities=cities15000`;
      let res = await fetch(url, { signal });
      let json = await res.json();

      return {
        items: json.geonames || []
      };
    }
  });

  const onSelectionChange = (key, item) => {
    console.log(item)
    if (item) {
      const newCity = item.name.trim();
      if (newCity.length > 0 && !cities.includes(newCity)) {
        setCities(prevCities => [...prevCities, newCity]);
      }
    }
  };

  return (
    <div className="flex flex-col lg:mx-4 max-lg:my-4 md:flex-nowrap gap-4">
      <Autocomplete
        label="Cities"
        placeholder="Search cities"
        className="max-w-xs w-96"
        items={list.items}
        inputValue={list.filterText}
        onInputChange={list.setFilterText}
        isLoading={list.isLoading}
        onSelectionChange={(key, item) => onSelectionChange(key, item)}
      >
        {item => (
          <AutocompleteItem key={item.geonameId} textValue={item.name}>
            {item.name}, {item.countryName}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <div className="flex items-center flex-wrap">
        {cities.map(city => (
          <Badge key={city} className="mx-1" color="primary" onDoubleClick={() => setCities(cities.filter(c => c !== city))}>
            {city} <Tooltip content="Delete"><Trash2 color="red" size={16} /></Tooltip>
          </Badge>
        ))}
      </div>
    </div>
  );
}
