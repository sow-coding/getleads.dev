import { supabase } from "@/utils/supabase/auth";

export async function POST (request: Request) {
    const req = await request.json()

    let { data, error } = await supabase
    .from('soloDecisionMaker')
    .select('person')
    .eq("id", req.id)
    .single()

    if (error) {
        return new Response(JSON.stringify({message: 'Invalid ID'}), {status: 400})
    }
    return new Response(JSON.stringify(data), {status: 200})
}