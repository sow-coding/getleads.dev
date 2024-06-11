import { supabase } from "@/utils/supabase/auth";

export async function GET (request: Request) {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")

    let { data, error } = await supabase
    .from('soloDecisionMaker')
    .select('person')
    .eq("id", id)
    .single()

    if (error) {
        return new Response(JSON.stringify({message: 'Invalid ID'}), {status: 400})
    }
    return new Response(JSON.stringify(data), {status: 200})
}