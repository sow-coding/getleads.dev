import { supabase } from "@/utils/supabase/auth"

export async function GET (request: Request) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    let { data: favorites, error } = await supabase
    .from('favorites')
    .select('organization')
    .eq('userId', userId)
    
    if (error) {
        console.log(error)
    }
    return new Response(JSON.stringify(favorites), {
        status: 200,
    })
}