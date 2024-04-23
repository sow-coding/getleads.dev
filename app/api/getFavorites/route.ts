import { supabase } from "@/utils/supabase/auth"

export async function POST (request: Request) {
    const req = await request.json()

    let { data: favorites, error } = await supabase
    .from('favorites')
    .select('organization')
    .eq('userId', req.userId)
    
    if (error) {
        console.log(error)
    }
    return new Response(JSON.stringify(favorites), {
        status: 200,
    })
}