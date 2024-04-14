"use client"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface OrganizationsType {
    organizations: any[];
    setOrganizations: Dispatch<SetStateAction<any[]>>
}

export const OrganizationsContext = createContext<OrganizationsType |null>(null)

export default function OrganizationsContextProvider ({children}: {children: React.ReactNode}) {
    const [organizations, setOrganizations] = useState<any[]>([])    
    return (
        <OrganizationsContext.Provider value={{
            organizations: organizations,
            setOrganizations: setOrganizations
        }}>
            {children}
        </OrganizationsContext.Provider>
    )
}

export function useOrganizationsContext () {
    const context = useContext(OrganizationsContext)
    if (!context) {
        throw new Error ("useOrganizationsContext must be used within OrganizationsContextProvider")
    }
    return context
}