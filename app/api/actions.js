"use server"

import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient();

function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}
//regler erreur ici
export async function verifyOrganizationsWithStackWappalyzer(entities, stack) {
    // Filtrer les entités pour ne garder que celles avec un website_url valide
    const websiteUrls = entities
        .map(entity => entity.website_url)
        .filter(url => url);  // Cette ligne enlève toutes les valeurs falsy (undefined, null, '', etc.)

    const urlChunks = chunkArray(websiteUrls, 10); // Utilisation de tranches de 10 URLs
    let results = {};

    for (const urls of urlChunks) {
        if (urls.length === 0) continue; // Si le chunk est vide, passez au suivant

        const apiUrl = `https://api.wappalyzer.com/v2/lookup?urls=${urls.join(',')}&live=false`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'x-api-key': process.env.WAPPALYZER_API_KEY }
        });

        if (!response.ok) {
            // Ici, log l'erreur pour plus de détails
            console.error('API call failed with status:', response.status);
            return await response.json();  // Retourne l'erreur si la réponse n'est pas OK
        }

        const data = await response.json();
        urls.forEach((url, index) => {
            // Vérifier si la réponse inclut une des technologies demandées
            const isTechnologyPresent = data[index]?.technologies?.some(tech => stack.includes(tech.name));
            results[url] = isTechnologyPresent;
        });
    }

    const verifiedEntities = entities.filter(entity => results[entity.website_url]); // Filtrer les entités validées

    return {
        id: uuidv4(),
        entities: verifiedEntities
    };
}

export async function saveSearchResults(searchId, organizations, searchFilters) {
    let userId = null;

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
    console.error('Erreur lors de la récupération de l’utilisateur connecté', userError);
    } else if (userData) {
    userId = userData.user.id;
    }
    const { data, error } = await supabase
    .from('searches')
    .insert([
      { user_id: userId, searchId: searchId, organizations_searched: organizations, filters: searchFilters }
    ]);

    if (error) {
        console.error('Erreur lors de la sauvegarde des résultats de recherche', error);
    } else {
        console.log('Résultats de recherche sauvegardés avec succès:', data);
    }
}

