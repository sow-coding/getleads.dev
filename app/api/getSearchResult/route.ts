import { supabase } from "@/utils/supabase/auth";

export async function POST (request: Request) {
    
    const { searchId } = await request.json()

    const { data, error } = await supabase
        .from('searches')
        .select('organizations_searched, filters')
        .eq('searchId', searchId)
        .single()
        
    if (error) {
        console.error(error)
        return new Response('Error from Supabase API' + error.message)
    } else {
        return new Response(JSON.stringify(data), {
            status: 200, 
            headers: {
                'content-type': 'application/json'
            }
        })
    }
}