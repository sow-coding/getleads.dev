import { supabase } from "@/utils/supabase/auth";

export async function POST (request: Request) {
    const req = await request.json();
    
    let { data: lookup, error } = await supabase
    .from('lookup')
    .select('*')
    .eq('website', req.website)
    .single()
    
    if (error) {
        return new Response (JSON.stringify(error.message), { status: 500 })
    } 

    return new Response (JSON.stringify(lookup), { status: 200 })
}