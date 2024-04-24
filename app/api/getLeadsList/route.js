export async function POST (request) {
    const req = await request.json();

    const requestBody = {
        technologies: [{slug: "react"}],
        countries: req.countries,
        companySizes: req.sizes,
        industries: req.industries,
        sets: ["locations"],
        callbackUrl: 'https://getleads.dev/api/leadsListCallback'
    };

    const response = await fetch("https://api.wappalyzer.com/v2/lists", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.WAPPALYZER_API_KEY,
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorText = await response.text();  // Get the text from the response to see more details
        console.log(errorText);
        throw new Error("Failed to fetch data from Wappalyzer API: " + errorText);
    }

    // Clone the response to be able to use the body again
    const clonedResponse = response.clone();

    // Return the original response body
    // Make sure to use clonedResponse.text() if you want to log or work with the text
    return new Response(await clonedResponse.blob(), {
        status: 200,
        headers: response.headers
    });
}
