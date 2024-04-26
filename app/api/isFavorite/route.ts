import { supabase } from "@/utils/supabase/auth";

export async function POST (request: Request) {
    const req = await request.json();
    
    let { data: favorites, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('id', req.id)
    .single()
    
    if (error) {
        console.error('Error fetching favorites:', error.message)
        return new Response(JSON.stringify({isFavorite: false}), { status: 500 })
    } else if (!favorites) {
        return new Response(JSON.stringify({isFavorite: false}), { status: 500 })
    }
    return new Response(JSON.stringify({isFavorite: true}), { status: 200 })
}