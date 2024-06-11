import { supabase } from "@/utils/supabase/auth";

export async function GET (request) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    let { data: soloDecisionMaker, error } = await supabase
    .from('soloDecisionMaker')
    .select('person')
    .eq("userId", userId)
    
    if (error) return (new Response(JSON.stringify(error), {status: 500}))

    return new Response(JSON.stringify(soloDecisionMaker), {status: 200})
}