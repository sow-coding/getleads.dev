import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
    const req = await request.json();
    const supabase = createClient();
    
    const {data, error} = await supabase.auth.updateUser({ password: req.password })

    if (error) {
        return new Response(null, { status: 500 });
    }
    
    return new Response(null, { status: 200 });
}