"use server"

import { supabase } from "@/utils/supabase/auth";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from 'uuid';

const supabase1 = createClient();

function chunkArray(array, chunkSize) {
    return Array(Math.ceil(array.length / chunkSize))
        .fill()
        .map((_, index) => array.slice(index * chunkSize, index * chunkSize + chunkSize));
}

function normalizeFilters(filters) {
    return Object.fromEntries(
        Object.entries(filters).map(([key, value]) => [
            key,
            Array.isArray(value) ? value.sort() : value
        ])
    );
}

async function checkUrlsInDatabase(urls) {
    let results = {};

    const { data, error } = await supabase
        .from('lookup')
        .select('website, technologies')
        .in('website', urls);

    if (error) {
        console.error('Error fetching data from database:', error.message);
        return results;
    }

    data.forEach(item => {
        results[item.website] = item.technologies;
    });

    return results;
}

async function saveLookupInDatabase(url, technologies) {
    const { error } = await supabase
        .from('lookup')
        .upsert(
            [
                {
                    website: url,
                    technologies
                }
            ],
            {
                onConflict: 'website'
            }
        );

    if (error) {
        console.error('Error saving data to database:', error.message);
    } else {
        console.log('Data saved successfully for:', url);
    }
}

async function fetchAndProcessUrls(urlsToFetch, stack) {
    const apiUrl = `https://api.wappalyzer.com/v2/lookup?urls=${urlsToFetch.join(',')}&live=false`;
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'x-api-key': process.env.WAPPALYZER_API_KEY }
    });

    if (!response.ok) {
        console.error('API call failed with status:', response.status);
        return {};
    }

    const data = await response.json();
    let results = {};

    await Promise.all(
        urlsToFetch.map(async (url) => {
            try {
                const apiData = data.find((d) => d.url === url);
                if (apiData && apiData.technologies) {
                    const isTechnologyPresent = apiData.technologies.some((tech) => stack.includes(tech.name));
                    results[url] = isTechnologyPresent;
                    await saveLookupInDatabase(url, apiData.technologies);
                } else {
                    console.error('No technologies data for URL:', url);
                    results[url] = false;
                }
            } catch (error) {
                console.error('Error processing URL:', url, error.message);
                results[url] = false;
            }
        })
    );

    return results;
}

export async function verifyOrganizationsWithStackWappalyzer(entities, stack) {
    const websiteUrls = entities
        .map((entity) => entity.website_url)
        .filter((url) => url);

    const urlChunks = chunkArray(websiteUrls, 10);
    let results = {};

    await Promise.all(
        urlChunks.map(async (urls) => {
            const lookupResults = await checkUrlsInDatabase(urls);

            const urlsToFetch = urls.filter((url) => !lookupResults[url]);

            let fetchedResults = {};
            if (urlsToFetch.length > 0) {
                fetchedResults = await fetchAndProcessUrls(urlsToFetch, stack);
            }

            urls.forEach((url) => {
                results[url] = lookupResults[url]
                    ? lookupResults[url].some((tech) => stack.includes(tech.name))
                    : fetchedResults[url];
            });
        })
    );

    const verifiedEntities = entities.filter((entity) => results[entity.website_url]);

    return {
        id: uuidv4(),
        entities: verifiedEntities
    };
}

export async function addSearchForTheUser() {
    const { data, error } = await supabase1.auth.getUser();

    if (error) {
        console.error("Error catching user:", error.message);
        return new Response(error.message, { status: 500 });
    }

    const { error: adminError } = await supabase.auth.admin.updateUserById(
        data.user.id,
        { user_metadata: { searches: data.user.user_metadata?.searches + 1 } }
    );
    if (adminError) {
        console.error("Error updating user:", adminError.message);
        return new Response(adminError.message, { status: 500 });
    }
}

export async function saveSearchResults(searchId, organizations, searchFilters, decisionMakers = []) {
    const normalizedFilters = normalizeFilters(searchFilters);

    const { data: userData, error: userError } = await supabase1.auth.getUser();
    if (userError) {
        console.error('Erreur lors de la récupération de l’utilisateur connecté', userError);
        return;
    }
    
    const userId = userData.user.id;
    const { error } = await supabase1
        .from('searches')
        .insert([
            { user_id: userId, searchId: searchId, organizations_searched: organizations, filters: normalizedFilters, decisionMakers: decisionMakers }
        ]);

    if (error) {
        console.error('Erreur lors de la sauvegarde des résultats de recherche', error);
    } else {
        console.log('Résultats de recherche sauvegardés avec succès.');
    }

    revalidatePath("userSearches")
    revalidatePath("searchHistory")
}

