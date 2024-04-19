export async function POST(request: Request) {
    const inputRequestBody = await request.json();

    const requestBody = {
        api_key: process.env.APOLLO_API_KEY,
        organization_num_employees_ranges: inputRequestBody.sizes,
        organization_locations: inputRequestBody.countries,
        q_organization_keyword_tags: inputRequestBody.industries, // en minuscle ici chaque element du tableau
        per_page: 2,
        page: 1
    };

    const response = await fetch('https://api.apollo.io/api/v1/mixed_companies/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        return new Response('Error from Apollo API' + response.text);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    });
}