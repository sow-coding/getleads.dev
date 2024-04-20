import { supabase } from "@/utils/supabase/auth";

export async function POST (request) {
    const inputRequestBody = await request.json();
    let { data: decisionMakers, error } = await supabase
    .from('searches')
    .select('decisionMakers')
    .eq('searchId', inputRequestBody.searchId)
    .single()
    
    if (error) {
        return new Response('Error from Supabase API' + error);
    }
    return new Response(JSON.stringify(decisionMakers), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    })
}