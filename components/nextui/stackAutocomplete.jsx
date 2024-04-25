"use client"
import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { Badge } from "@nextui-org/react";
import { Trash2 } from "lucide-react";

export default function StackAutocomplete({ stackHere, setStackHere }) {
  const [hoveredStack, setHoveredStack] = React.useState(null);

  let list = useAsyncList({
    async load({ signal, filterText }) {
      if (!filterText.trim().length) return { items: [] };
      let url = `https://api.wappalyzer.com/v2/technologies/?search=${encodeURIComponent(filterText)}`;
      try {
        let res = await fetch(url, { signal });
        if (!res.ok) {
          console.error("Failed to fetch: HTTP status", res.status);
          return { items: [] };
        }
        let json = await res.json();
        return {
          items: json.map(item => ({ id: item.slug, name: item.name }))
        };
      } catch (error) {
        console.error("Error fetching technologies", error);
        return { items: [] };
      }
    }
  });

  const onSelectionChange = (item) => {
    if (item.id && !stackHere.includes(item.id)) {
      setStackHere(prevKeys => [...prevKeys, item.id]);
    }
  };

  const handleRemoveStack = (key) => {
    setStackHere(stackHere.filter(k => k !== key));
  };

  return (
    <div className="flex w-full flex-col">
      <Autocomplete
        label="Technology Stack"
        placeholder="Search technologies"
        className="max-w-xs w-full"
        items={list.items}
        inputValue={list.filterText}
        onInputChange={list.setFilterText}
        isLoading={list.isLoading}
        onSelectionChange={(item) => onSelectionChange(item)}
      >
        {(item) => (
          <AutocompleteItem key={item.id} textValue={item.name}>
            {item.name}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <div className="flex flex-wrap gap-2 mt-4">
        {stackHere.map(tech => (
          <Badge
            key={tech}
            color="primary"
            bordered
            className="relative cursor-pointer"
            onMouseEnter={() => setHoveredStack(tech)}
            onMouseLeave={() => setHoveredStack(null)}
            onClick={() => handleRemoveStack(tech)}
          >
            {hoveredStack === tech ? <Trash2 color="red" size={16} /> : tech}
          </Badge>
        ))}
      </div>
    </div>
  );
}
