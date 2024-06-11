import { supabase } from "@/utils/supabase/auth";
import { createClient } from "@/utils/supabase/server"

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
    .from('organizationsEnrichment')
    .update({ decisionMakers: data.people })
    .eq('id', inputRequestBody.id)
    .select();

    if (error) {
        console.error('Error from Supabase API', error);
        return new Response('Error from Supabase API' + error);
    }

    // Créer une instance Supabase pour l'authentification
    const supabase1 = createClient();
    const { data: userData, error: userError } = await supabase1.auth.getUser();

    if (userError) {
        console.error('Error fetching user', userError);
        return new Response('Error fetching user' + userError);
    }

    // Filtrer les données pour les utilisateurs gratuits
    if (userData?.user?.user_metadata?.userType === 'free') {
        const filteredPeople = data.people.map(person => ({
            name: person.name,
            departments: person.departments,
            title: person.title,
            headline: person.headline,
            subdepartments: person.subdepartments,
            seniority: person.seniority,
            linkedin_url: person.linkedin_url
        }));
        
        // Remplacer data.people avec les données filtrées
        data.people = filteredPeople;
    }

    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    });
}
