import { supabase } from "@/utils/supabase/auth";

export async function GET (request: Request) {
    const {searchParams} = new URL(request.url)
    const website = searchParams.get("website")
    
    let { data: lookup, error } = await supabase
    .from('lookup')
    .select('*')
    .eq('website', website)
    .single()
    
    if (error) {
        return new Response (JSON.stringify(error.message), { status: 500 })
    } 

    return new Response (JSON.stringify(lookup), { status: 200 })
}