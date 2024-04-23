import { createClient } from "@/utils/supabase/server"

export async function GET () {
    const supabase = createClient()
  
    const { data, error } = await supabase.auth.getUser()

    if (error) return { status: 500, body: error.message }
    return new Response(JSON.stringify(data.user.id), { status: 200 })
}