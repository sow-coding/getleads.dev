import { supabase } from "@/utils/supabase/auth";
import { createClient } from "@/utils/supabase/server";

export async function GET (request) {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")

    let { data: decisionMakers, error } = await supabase
        .from('organizationsEnrichment')
        .select('decisionMakers')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error from Supabase API', error);
        return new Response('Error from Supabase API' + error.message, {
            status: 400
        });
    }

    // Créer une instance Supabase pour l'authentification
    const supabase1 = createClient();
    const { data: userData, error: userError } = await supabase1.auth.getUser();

    if (userError) {
        console.error('Error fetching user', userError);
        return new Response('Error fetching user' + userError.message, {
            status: 400
        });
    }

    // Filtrer les données pour les utilisateurs gratuits
    if (userData?.user?.user_metadata?.userType === 'free' && decisionMakers?.decisionMakers) {
        const filteredDecisionMakers = decisionMakers.decisionMakers.map(person => ({
            name: person.name,
            departments: person.departments,
            title: person.title,
            headline: person.headline,
            subdepartments: person.subdepartments,
            seniority: person.seniority,
            linkedin_url: person.linkedin_url
        }));

        decisionMakers.decisionMakers = filteredDecisionMakers;
    }

    return new Response(JSON.stringify(decisionMakers), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    });
}
