"use client"
import React from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { industries } from "./industriesData";

export default function IndustryAutoComplete() {
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-4">
      <Autocomplete
        label="Company's Industry"
        placeholder="Search an industry"
        className="max-w-xs w-96"
        defaultItems={industries}
      >
        {(item) => <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>}
      </Autocomplete>
    </div>
  );
}
