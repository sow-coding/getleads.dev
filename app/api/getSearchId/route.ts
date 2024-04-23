import { supabase } from "@/utils/supabase/auth";

export async function POST(request: Request) {
    const req = await request.json();
    
    // Récupérer les données des recherches pour l'utilisateur donné
    let { data: searches, error } = await supabase
        .from('searches')
        .select('searchId, organizations_searched')
        .eq('user_id', req.userId);

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    // Trouver le searchId pour l'id d'organisation spécifié dans la requête
    const searchId = getSearchIdByOrganizationId(searches, req.organizationId);

    if (searchId) {
        return new Response(JSON.stringify({ searchId: searchId }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ error: "Organization ID not found" }), { status: 404 });
    }
}

// Fonction auxiliaire pour trouver le searchId par l'id de l'organisation
function getSearchIdByOrganizationId(searches: any, organizationId: any) {
    for (let record of searches) {
        for (let organization of record.organizations_searched) {
            if (organization.id === organizationId) {
                return record.searchId;
            }
        }
    }
    return null; // Retourne null si aucun `searchId` correspondant n'est trouvé
}
