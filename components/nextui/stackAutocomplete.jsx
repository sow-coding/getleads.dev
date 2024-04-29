"use client"
import React, { Key } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { stackData } from "./stackData";
import { useStackContext } from "@/contexts/stack.context";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox"


export default function StackAutocomplete({stackHere, setStackHere}) {
    const { stack, setStack } = useStackContext();

    
   function CheckboxDemo() {
      return (
        <div className="flex items-center my-4 space-x-2">
          <Checkbox id="stack" />
          <label
            htmlFor="stack"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            All elements of the stack must be present together in the company stack
          </label>
        </div>
      )
    }

    const onSelectionChange = (key) => {
        if (key != null && !stackHere.includes(key)) {
            setStackHere(prevKeys => [...prevKeys, key]);
        }
    };

    const handleRemoveStack = (key) => {
      setStackHere(stackHere.filter(k => k !== key));
    };

    React.useEffect(() => {
        const updatedStack = stackHere.map(key => String(key));
        setStack(updatedStack);
    }, [stackHere, setStack]);

    return (
        <div className="flex w-full flex-col">
            <Autocomplete
                label="Stack"
                placeholder="Pick a stack"
                className="max-w-xs w-full"
                defaultItems={stackData}
                onSelectionChange={onSelectionChange}
                disabledKeys={["Express (coming soon)", "Laravel (coming soon)", "Marko (coming soon)", "Emotion (coming soon)", "Backbone.js (coming soon)", "Gatsby (coming soon)"]}
            >
                {(item) => <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>}
            </Autocomplete>
            <div className="flex flex-wrap gap-2 mt-4">
              {stackHere.map(tech => (
                <Badge
                  key={tech}
                  color="primary"
                  bordered
                  className="relative cursor-pointer"
                  onClick={() => handleRemoveStack(tech)}
                >
                  {tech}
                </Badge>
              ))}
            </div>
        </div>
    );
}