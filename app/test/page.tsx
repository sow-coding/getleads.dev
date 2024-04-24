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
                companySizes: ["10"],
                industries: ["Software Development"],                
            })
        })
        const data = await response.json()
        console.log(data)
    }
  return (
    <button onClick={() => {
        call()
    }}>Call</button>
  )
}

export default Test