import { supabase } from "@/utils/supabase/auth";

export async function POST (request: Request) {
    const req = await request.json()
    
    let { data: searches, error } = await supabase
    .from('searches')
    .select('organizations_searched, filters, searchId')
    .eq("user_id", req.userId)

    if (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
    return new Response(JSON.stringify(searches), { status: 200 })
}