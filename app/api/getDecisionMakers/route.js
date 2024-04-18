export async function POST (request) {
    const requestBody = await request.json();
    const { domain } = requestBody;
    const apiKey = process.env.HUNTER_API_KEY;
    function normalizeUrl(url) {
        return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    }
    
    const response = await fetch(`https://api.hunter.io/v2/domain-search?domain=${normalizeUrl(domain)}&type=personal&seniority=executive&department=executive,it,management,sales,hr&api_key=${apiKey}`);
    if (!response.ok) {
        return new Response(JSON.stringify({ error: 'Failed to fetch domain info' + response.statusText }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}