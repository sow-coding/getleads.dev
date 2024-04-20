import { supabase } from "@/utils/supabase/auth";

export async function POST (requets: Request) {
    const req = await requets.json()
    
    let { data, error } = await supabase
    .from('soloDecisionMaker')
    .select('deliverableEmail')
    .eq("id", req.id)
    .single()
        
    if (error) {
        return new Response(JSON.stringify({message: 'Invalid email'}), {status: 400})
    } else if (data === null) {
        return new Response(JSON.stringify({message: 'Email not found'}), {status: 400})
    }
    return new Response(JSON.stringify(data), {status: 200})
}