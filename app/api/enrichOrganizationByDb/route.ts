import { supabase } from "@/utils/supabase/auth";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")

    let { data: organizationsEnrichment, error } = await supabase
    .from('organizationsEnrichment')
    .select('organization')
    .eq("id", id)
    .single()
    
    if (error) {
        console.log(error)
        return new Response(JSON.stringify({message: 'Invalid organization'}), {status: 400})
    } else if (organizationsEnrichment === null) {
        return new Response(JSON.stringify({message: 'Organization not found'}), {status: 400})
    }

    return new Response(JSON.stringify(organizationsEnrichment), {status: 200})
}