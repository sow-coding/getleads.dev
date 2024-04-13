"use client"
import React, { Key } from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { stackData } from "./stackData";

export default function StackAutocomplete() {
    //react avec hunter tech lookup a d'abord utilise avant celle de builtwith
    //stack setStack en context
  const [stack, setStack] = React.useState<Key[]>([]);

  const onSelectionChange = (key: React.Key) => {
    setStack([...stack, key]);
  }; 

  return (
    <div className="flex w-full flex-col">
      <Autocomplete
        label="Stack"
        placeholder="Pick a stack"
        className="max-w-xs w-full"
        defaultItems={stackData}
        onSelectionChange={onSelectionChange}
      >
        {(item) => <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>}
      </Autocomplete>
      <p className="mt-1 text-small text-default-500">Current stack selected: {stack.map((tech) => (<span key={tech}> {tech?.toString()}</span>))}</p>
    </div>
  );
}
