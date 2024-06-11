import { supabase } from "@/utils/supabase/auth";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const searchId = searchParams.get("searchId")

    const { data, error } = await supabase
        .from('searches')
        .select('organizations_searched, filters')
        .eq('searchId', searchId)
        .single();

    if (error) {
        console.error(error);
        return new Response('Error from Supabase API' + error.message, {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const supabase1 = createClient();
    const { data: userData, error: userError } = await supabase1.auth.getUser();

    if (userError) {
        console.error('Error fetching user', userError);
        return new Response('Error fetching user' + userError.message, {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    // Limiter le nombre d'organisations pour les utilisateurs gratuits
    if (userData?.user?.user_metadata?.userType === 'free' && data?.organizations_searched) {
        data.organizations_searched = data.organizations_searched.slice(0, 4);
    }

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    });
}
