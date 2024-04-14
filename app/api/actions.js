"use server"

function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}

function normalizeUrl(url) {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

async function lookupBuiltWith(urls, stack) {
    const apiKey = process.env.BUILTWITH_API_KEY;
    // Normaliser et joindre toutes les URLs pour la requête API
    const urlList = urls.map(url => normalizeUrl(url)).join(',');
    const builtWithUrl = `https://api.builtwith.com/v21/api.json?KEY=${apiKey}&LIVEONLY=yes&HIDETEXT=yes&NOMETA=yes&NOPII=yes&NOLIVE=yes&NOATTR=yes&LOOKUP=${urlList}`;

    try {
        const response = await fetch(builtWithUrl);
        if (!response.ok) throw new Error('Réponse non valide de BuiltWith');

        const data = await response.json();
        const results = {};
        data.Results.forEach((result) => {
            const isStackUsed = result.Result.Paths.some(path => 
                path.Technologies.some(tech => tech.Name === 'Next.js')
            );
            // Stocker les résultats avec l'URL normalisée comme clé
            results[normalizeUrl(result.Lookup)] = isStackUsed;
        });
        
        return results;
    } catch (error) {
        console.error('Erreur lors de l’appel à API BuiltWith:', error);
        throw error;
    }
}

export async function verifyOrganizationsWithStack(entities, stack) {
    const websiteUrls = entities.map(entity => entity.properties.website_url);
    const urlChunks = chunkArray(websiteUrls, 16);

    let results = {};

    for (const urls of urlChunks) {
        const partialResults = await lookupBuiltWith(urls.map(url => normalizeUrl(url)));
        results = { ...results, ...partialResults };
    }

    const verifiedEntities = entities.filter(entity => {
        // Utiliser l'URL normalisée pour vérifier si Next.js est utilisé
        const isStackUsed = results[normalizeUrl(entity.properties.website_url)];
        return isStackUsed;
    });

    return verifiedEntities;
}


