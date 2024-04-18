"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function DecisionMakers() {
    const searchParams = useSearchParams()
    const domain = searchParams.get("domain")
    const id = searchParams.get("id")
    const [loading, setLoading] = useState(true)
    const [decisionMakers, setDecisionMakers] = useState([])

    useEffect(() => {
        async function getDecisionMakers() {
            const response = await fetch(`/api/getDecisionMakers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    domain
                })
            
            })
            const data = await response.json()
            console.log(data)
            //setDecisionMakers(data)
            setLoading(false)
        }
        getDecisionMakers()
    }, [domain])

    useEffect(() => {
        async function getDecisionMakers() {
            const response = await fetch(`/api/searchDecisionMakers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id
                })
            
            })
            const data = await response.json()
            console.log(data)
            //setDecisionMakers(data)
            setLoading(false)
        }
        getDecisionMakers()
    }, [domain, id])

    return (
        <>
            {loading ? <h1>Loading...</h1> : <h1>Look at your console</h1>}
        </>
    )
}

export default DecisionMakers