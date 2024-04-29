export async function POST(request) {
    const inputRequestBody = await request.json();

    // Initialize the request body with the static values
    let requestBody = {
        api_key: process.env.APOLLO_API_KEY,
        per_page: 2,
        page: 1
    };

    // Conditionally add properties if their arrays are not empty
    if (inputRequestBody.sizes.length > 0) {
        requestBody.organization_num_employees_ranges = inputRequestBody.sizes;
    }
    if (inputRequestBody.countries.length > 0) {
        requestBody.organization_locations = inputRequestBody.countries;
    }
    if (inputRequestBody.industries.length > 0) {
        requestBody.q_organization_keyword_tags = inputRequestBody.industries;
    }

    const response = await fetch('https://api.apollo.io/api/v1/mixed_companies/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        return new Response('Error from Apollo API' + response.text());
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    });
}
