import { createClient } from "@/utils/supabase/server"

export async function POST (request: Request) {
    const supabase = createClient()
    const req = await request.json()

    const { data, error } = await supabase.auth.resetPasswordForEmail(req.email, {
        redirectTo: 'http://localhost:3000/settings/password',
    })

    if (error) {
        console.error(error)
    }

    return new Response(null, { status: 200 })
}