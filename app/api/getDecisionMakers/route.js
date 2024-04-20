import { supabase } from "@/utils/supabase/auth";

export async function POST(request) {
    const inputRequestBody = await request.json();
    const requestBody = {
        api_key: process.env.APOLLO_API_KEY,
        organization_ids: [inputRequestBody.id],
    };
    const response = await fetch('https://api.apollo.io/v1/mixed_people/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        return new Response('Error from Apollo API' + response.text());
    }

    const data = await response.json();

    const { data: supabaseData, error } = await supabase
    .from('searches')
    .update({ decisionMakers: data.people })
    .eq('searchId', inputRequestBody.searchId)
    .select()

    if  (error) {
        return new Response('Error from Supabase API' + error);
    }

    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    });
}