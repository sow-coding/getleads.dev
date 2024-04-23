import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
    const req = await request.json();
    const supabase = createClient();
    await supabase.auth.updateUser({ password: req.password })
    
    return new Response(null, { status: 200 });
}