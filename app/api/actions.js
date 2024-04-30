"use server"

import { supabase } from "@/utils/supabase/auth";
import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from 'uuid';

const supabase1 = createClient();

function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}

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

export async function verifyOrganizationsWithStackWappalyzer(entities, stack) {
    const websiteUrls = entities
        .map(entity => entity.website_url)
        .filter(url => url);  // Filtrer les URLs vides

    const urlChunks = chunkArray(websiteUrls, 10); // Chunks de 10 URLs
    let results = {};

    for (const urls of urlChunks) {
        // Premièrement, vérifier si les données existent dans la base de données
        const lookupResults = await checkUrlsInDatabase(urls);

        // Filtrer les URLs qui ne sont pas déjà enregistrées dans la base de données
        const urlsToFetch = urls.filter(url => !lookupResults[url]);

        if (urlsToFetch.length > 0) {
            const apiUrl = `https://api.wappalyzer.com/v2/lookup?urls=${urlsToFetch.join(',')}&live=false`;
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: { 'x-api-key': process.env.WAPPALYZER_API_KEY }
            });

            if (!response.ok) {
                console.error('API call failed with status:', response.status);
                continue;  // Passer à l'itération suivante si l'appel API échoue
            }

            const data = await response.json();

            // Traiter les données reçues et les enregistrer dans la base de données
            for (let i = 0; i < urlsToFetch.length; i++) {
                try {
                    const url = urlsToFetch[i];
                    const apiData = data.find(d => d.url === url);
                    if (apiData && apiData.technologies) {
                        const isTechnologyPresent = apiData.technologies.some(tech => stack.includes(tech.name));
                        results[url] = isTechnologyPresent;
                        await saveLookupInDatabase(url, apiData.technologies);
                    } else {
                        console.error('No technologies data for URL:', url);
                        results[url] = false;
                    }
                } catch (error) {
                    console.error(error.message);
                    results[url] = false;
                    continue;  // Passer à l'itération suivante si une erreur se produit
                }
            }
        }

        // Utiliser les résultats de la base de données pour les URLs déjà connues
        urls.forEach(url => {
            if (lookupResults[url]) {
                results[url] = lookupResults[url].some(tech => stack.includes(tech.name));
            }
        });
    }

    const verifiedEntities = entities.filter(entity => results[entity.website_url]);

    return {
        id: uuidv4(),
        entities: verifiedEntities
    };
}

// Fonction pour vérifier si les URLs ont déjà été analysées et sont stockées dans la base de données
async function checkUrlsInDatabase(urls) {
    let results = {};

    const { data, error } = await supabase
        .from('lookup')
        .select('website, technologies')
        .in('website', urls); // Recherche des entrées où la colonne 'website' est dans la liste des URLs

    if (error) {
        console.error('Error fetching data from database:', error.message);
        return results;
    }

    // Formatter les données pour les retourner dans la structure attendue
    data.forEach(item => {
        results[item.website] = item.technologies; // Assumer que 'technologies' est déjà un tableau
    });

    return results;
}

// Fonction pour enregistrer les nouvelles données obtenues de l'API Wappalyzer dans la base de données
async function saveLookupInDatabase(url, technologies) {
    const { data, error } = await supabase
        .from('lookup')
        .upsert([
            {
                website: url,
                technologies: technologies // Supposer que 'technologies' est un tableau d'objets ou de chaînes
            }
        ], {
            onConflict: 'website' // Spécifie la colonne clé pour les conflits
        });

    if (error) {
        console.error('Error saving data to database:', error.message);
    } else {
        console.log('Data saved successfully:', data);
    }
}

export async function addSearchForTheUser () {
    const { data, error } = await supabase1.auth.getUser()

    if (error) {
    console.log("Error catching user: ", error.message)
    return new Response(error.message, { status: 500 });
    }

    const { data: userInfo, error: adminError } = await supabase.auth.admin.updateUserById(
        data.user.id,
        { user_metadata: { searches: data.user.user_metadata?.searches + 1 } }
        )
        if (adminError) {
        console.log("Error updating user: ", error.message, userId)
        return new Response(error.message, { status: 500 });
        }
}


export async function saveSearchResults(searchId, organizations, searchFilters, decisionMakers) {
    let userId = null;
    const normalizedFilters = normalizeFilters(searchFilters);

    const { data: userData, error: userError } = await supabase1.auth.getUser();
    if (userError) {
    console.error('Erreur lors de la récupération de l’utilisateur connecté', userError);
    } else if (userData) {
    userId = userData.user.id;
    }
    const { data, error } = await supabase1
    .from('searches')
    .insert([
      { user_id: userId, searchId: searchId, organizations_searched: organizations, filters: normalizedFilters, decisionMakers: decisionMakers }
    ]);

    if (error) {
        console.error('Erreur lors de la sauvegarde des résultats de recherche', error);
    } else {
        console.log('Résultats de recherche sauvegardés avec succès:', data);
    }
}

