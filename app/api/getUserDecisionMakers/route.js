import { supabase } from "@/utils/supabase/auth";

export async function POST (request) {
    const req = await request.json();
    
    let { data: soloDecisionMaker, error } = await supabase
    .from('soloDecisionMaker')
    .select('person')
    .eq("userId", req.userId)
    
    if (error) return (new Response(JSON.stringify(error), {status: 500}))

    return new Response(JSON.stringify(soloDecisionMaker), {status: 200})
}