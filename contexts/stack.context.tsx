"use client"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface StackType {
    stack: string[];
    setStack: Dispatch<SetStateAction<string[]>>
}

export const StackContext = createContext<StackType |null>(null)

export default function StackContextProvider ({children}: {children: React.ReactNode}) {
    const [stack, setStack] = useState<string[]>([])    
    return (
        <StackContext.Provider value={{
            stack: stack,
            setStack: setStack
        }}>
            {children}
        </StackContext.Provider>
    )
}

export function useStackContext () {
    const context = useContext(StackContext)
    if (!context) {
        throw new Error ("useStackContext must be used within StackContextProvider")
    }
    return context
}