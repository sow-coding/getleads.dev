"use client"
import React, { Key } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { stackData } from "./stackData";
import { useStackContext } from "@/contexts/stack.context";

export default function StackAutocomplete({stackHere, setStackHere}: {stackHere: Key[], setStackHere: React.Dispatch<React.SetStateAction<Key[]>>}) {
    const [inputValue, setInputValue] = React.useState<string>('');
    const { stack, setStack } = useStackContext();

    const onSelectionChange = (key: React.Key) => {
        if (key != null && !stackHere.includes(key)) {
            setStackHere(prevKeys => [...prevKeys, key]);
        }
    };

    const onInputChange = (value: string) => {
        setInputValue(value);
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
                onInputChange={onInputChange}
            >
                {(item) => <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>}
            </Autocomplete>
            <p className="mt-4 text-small text-default-500">Current stack selected: {stack.map(tech => <span key={tech}> {tech}</span>)}</p>
        </div>
    );
}
