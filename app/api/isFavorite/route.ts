import { supabase } from "@/utils/supabase/auth";

export async function GET (request: Request) {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")

    let { data: favorites, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('id', id)
    .single()
    
    if (error) {
        console.error('Error fetching favorites:', error.message)
        return new Response(JSON.stringify({isFavorite: false}), { status: 500 })
    } else if (!favorites) {
        return new Response(JSON.stringify({isFavorite: false}), { status: 500 })
    }
    return new Response(JSON.stringify({isFavorite: true}), { status: 200 })
}