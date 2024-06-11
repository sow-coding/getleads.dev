import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function POST (request: Request) {
    const req = await request.json()
    const supabase = createClient()
    const { data, error } = await supabase.auth.updateUser({
        email: req.email
    })
    revalidatePath("userEmail")
    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 })
    }
    return new Response(JSON.stringify(data), { status: 200 })
}