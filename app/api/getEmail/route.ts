export async function POST (requets: Request) {
    const req = await requets.json()
    const response = await fetch(`https://api.hunter.io/v2/email-finder?domain=${req.domain}&first_name=${req.firstName}&last_name=${req.lastName}&api_key=${process.env.HUNTER_API_KEY}`)    

    if (!response.ok) {
        return new Response(JSON.stringify({message: 'Invalid email' + response.text()}), {status: 400})
    }
    const data = await response.json()
    return new Response(JSON.stringify(data), {status: 200})
}