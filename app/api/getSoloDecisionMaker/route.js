export async function POST(request) {
    const inputRequestBody = await request.json();

    const requestBody = {
        api_key: process.env.APOLLO_API_KEY,
        id: inputRequestBody.id 
    };

    const response = await fetch('https://api.apollo.io/v1/people/match', {
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