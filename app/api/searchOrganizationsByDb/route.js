import { supabase } from "@/utils/supabase/auth";

export async function POST(request) {
    function normalizeFilters(filters) {
        const normalizedFilters = {};
        Object.keys(filters).forEach(key => {
            if (Array.isArray(filters[key])) {
                // Tri des tableaux pour assurer la cohérence
                normalizedFilters[key] = filters[key].sort();
            } else {
                normalizedFilters[key] = filters[key];
            }
        });
        return normalizedFilters;
    }

    try {
        const req = await request.json();
        const normalizedFilters = normalizeFilters(req.filters);
        console.log(normalizedFilters)
        let { data: searches, error } = await supabase
            .from('searches')
            .select('organizations_searched, decisionMakers')
            .eq("filters", JSON.stringify(normalizedFilters));  // Assurez-vous que les filtres sont bien formatés en JSON pour la comparaison

        if (error) {
            throw new Error(error.message);
        }

        // Vérifier explicitement que des recherches correspondantes existent
        if (searches && searches.length > 0) {
            return new Response(JSON.stringify(searches[0]), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            });
        } else {
            // Aucune recherche correspondante trouvée
            return new Response(JSON.stringify({ message: "No matching searches found" }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            });
        }
    } catch (error) {
        // Gestion des erreurs en cas de problème avec la requête ou la base de données
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
