import { supabase } from "@/utils/supabase/auth";

export async function POST (request: Request) {
    const req = await request.json();
    
    let { data: soloDecisionMaker, error } = await supabase
    .from('soloDecisionMaker')
    .select('person')
    .eq("userId", req.userId)
    
    if (error) return { status: 500, body: error.message } 

    return new Response(JSON.stringify(soloDecisionMaker), {status: 200})
}