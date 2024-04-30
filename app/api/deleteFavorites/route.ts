import { supabase } from "@/utils/supabase/auth"

export async function POST (request: Request) {
    const req  = await request.json()

    const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('id', req.id)

    if (error) {
        return new Response (JSON.stringify(error.message), { status: 500 })
    }

    return new Response (JSON.stringify('Deleted'), { status: 200 })
}