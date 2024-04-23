"use client"
import React, { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { industriesData } from "./industriesData";
import { useFiltersContext } from "@/contexts/filters.context";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react"; // Make sure to import the Trash2 icon

export default function IndustryAutoComplete() {
  const { industries, setIndustries } = useFiltersContext();
  const [hoveredIndustry, setHoveredIndustry] = useState(null);

  const onSelectionChange = (key) => {
    // Convert key to string unless it's null or undefined and convert to lower case
    const newIndustry = key != null ? String(key).toLowerCase().trim() : '';
  
    // Check if the new industry is a non-empty string and not already in the list
    if (newIndustry.length > 0 && !industries.includes(newIndustry)) {
      setIndustries(prevIndustries => [...prevIndustries, newIndustry]);
    }
  };

  const handleRemoveIndustry = (industry) => {
    setIndustries(prevIndustries => prevIndustries.filter(ind => ind !== industry));
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <Autocomplete
        label="Company's Industry"
        placeholder="Search an industry"
        className="max-w-xs w-96"
        defaultItems={industriesData}
        onSelectionChange={onSelectionChange}
      >
        {(item) => <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>}
      </Autocomplete>
      <div className="flex items-center flex-wrap">
        {industries.map(industry => (
          <div
            key={industry}
            onMouseEnter={() => setHoveredIndustry(industry)}
            onMouseLeave={() => setHoveredIndustry(null)}
            className="relative cursor-pointer mx-1"
            onClick={() => handleRemoveIndustry(industry)}
          >
            <Badge variant="flat">
              {hoveredIndustry === industry ? <Trash2 color="red" size={16} /> : industry}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
