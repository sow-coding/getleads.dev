import { lookupBuiltWith } from "../actions"

export async function POST (request) {
    const req = request.json()
    const requestBody = await req

    try {
        const isNextJsUsed = await lookupBuiltWith(["https://nextjs.org", "https://vercel.com"])

        return new Response(JSON.stringify(isNextJsUsed), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        })
    }
}