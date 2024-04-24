"use client"

function Test() {
    async function call () {
        const response = await fetch("/api/getLeadsList", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                countries: ["US"],
                companySizes: [50],
                industries: ["Software Development"]                
            })
        })
        const data = await response.json()
    }
  return (
    <button onClick={() => {
        call()
    }}>Call</button>
  )
}

export default Test