import React from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {useAsyncList} from "@react-stately/data";

export function AsyncIndustryAutoComplete () {

  let list = useAsyncList({
    async load({signal, filterText}) {
      let res = await fetch(`/api/getIndustry?filter=${filterText}`, {signal});
      let json = await res.json();

      return {
        items: json
      };
    },
  });

  return (
    <Autocomplete
      className="max-w-xs"
      inputValue={list.filterText}
      isLoading={list.isLoading}
      items={list.items}
      label="Pick an industry..."
      placeholder="Type to search..."
      variant="bordered"
      onInputChange={list.setFilterText}
    >
      {(item) => (
        <AutocompleteItem key={item.name} className="capitalize">
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
