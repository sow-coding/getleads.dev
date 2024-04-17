import { supabase } from "@/utils/supabase/auth";

export async function POST (request) {
    // Extraire le searchId et l'UUID de l'entité spécifique de la requête
    const { searchId, entityUuid } = await request.json();

    // Requête à la base de données pour récupérer le tableau des entités
    const { data, error } = await supabase
        .from('searches')
        .select('organizations_searched')
        .eq('searchId', searchId)
        .single();

    if (error) {
        console.error('Error fetching data:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    if (!data || !data.organizations_searched) {
        return new Response(JSON.stringify({ error: "No data found" }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    // Trouver l'entité spécifique par UUID
    const specificEntity = data.organizations_searched.find(entity => entity.uuid == entityUuid);

    if (!specificEntity) {
        return new Response(JSON.stringify({ error: "Entity not found" }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    // Retourner l'entité trouvée
    return new Response(JSON.stringify(specificEntity), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
