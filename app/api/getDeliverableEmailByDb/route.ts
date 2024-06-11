import { supabase } from "@/utils/supabase/auth";

export async function GET (request: Request) {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")

    let { data, error } = await supabase
    .from('soloDecisionMaker')
    .select('deliverableEmail')
    .eq("id", id)
    .single()
        
    if (error) {
        console.log(error)
        return new Response(JSON.stringify({message: 'Invalid email'}), {status: 400})
    } else if (data === null) {
        return new Response(JSON.stringify({message: 'Email not found'}), {status: 400})
    }
    return new Response(JSON.stringify(data), {status: 200})
}