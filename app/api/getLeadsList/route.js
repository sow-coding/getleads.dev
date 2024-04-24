export async function POST (request) {
    const req = await request.json()

    const requestBody = {
        technologies: ["React"],
        countries: req.countries,
        companySizes: req.sizes,
        industries: req.industries,
        subset: 2,
        sets: ["locations"],
        callback: 'https://getleads.dev/api/leadListCallback'
    }

    const response = await fetch("https://api.wappalyzer.com/v2/lists", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.WAPPALYZER_API_KEY,
        },
        body: JSON.stringify(requestBody),
    })
    if (!response.ok) {
        throw new Error("Failed to fetch data from Wappalyzer API" + response.text())
    }
    return new Response(response.body, {
        status: 200,
    })
}