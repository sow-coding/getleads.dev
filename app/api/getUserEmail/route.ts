import { createClient } from "@/utils/supabase/server"

export async function GET () {
    const supabase = createClient()
  
    const { data, error } = await supabase.auth.getUser()

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
    return new Response(JSON.stringify(data.user.email), { status: 200 })
}