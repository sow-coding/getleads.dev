"use client"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface FiltersType {
    countries: string[];
    setCountries: Dispatch<SetStateAction<string[]>>
    cities: string[];
    setCities: Dispatch<SetStateAction<string[]>>
    industries: string[];
    setIndustries: Dispatch<SetStateAction<string[]>>
    sizes: string[];
    setSizes: Dispatch<SetStateAction<string[]>>
}

export const FiltersContext = createContext<FiltersType |null>(null)

export default function FiltersContextProvider ({children}: {children: React.ReactNode}) {
    const [countries, setCountries] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])
    const [industries, setIndustries] = useState<string[]>([])
    const [sizes, setSizes] = useState<string[]>([])  
    return (
        <FiltersContext.Provider value={{
            countries, setCountries,
            cities, setCities,
            industries, setIndustries,
            sizes, setSizes
        }}>
            {children}
        </FiltersContext.Provider>
    )
}

export function useFiltersContext () {
    const context = useContext(FiltersContext)
    if (!context) {
        throw new Error ("useFiltersContext must be used within FiltersContextProvider")
    }
    return context
}