import { supabase } from "@/utils/supabase/auth";

export async function POST(request: Request) {
    const req = await request.json();

    const response = await fetch(`https://api.apollo.io/v1/organizations/enrich?api_key=${process.env.APOLLO_API_KEY}&domain=${req.domain}`);

    if (!response.ok) {
        return new Response('Error from Apollo API' + response.text());
    }

    const data = await response.json();
    
    const { data: dbData, error } = await supabase
    .from('organizationsEnrichment')
    .insert([
    { id: data?.organization?.id, organization: data?.organization },
    ])
    .select()

    if (error) {
        console.log(error);
        return new Response('Error from Supabase to add an organization');
    }
        
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    });
}