"use server"
export async function lookupBuiltWith(urls) {
    // Clé API stockée de manière sécurisée, montrée ici à titre d'exemple
    const apiKey = process.env.BUILTWITH_API_KEY;
    // Joindre toutes les URLs avec des virgules
    const urlList = urls.join(',');

    const builtWithUrl = `https://api.builtwith.com/v21/api.json?KEY=${apiKey}&LIVEONLY=yes&HIDETEXT=yes&NOMETA=yes&NOPII=yes&NOLIVE=yes&NOATTR=yes&LOOKUP=${urlList}`;

    try {
        const response = await fetch(builtWithUrl);
        if (!response.ok) throw new Error('Réponse non valide de BuiltWith');

        const data = await response.json();
        // Analyser la réponse pour vérifier l'utilisation de Next.js
        const results = data.Results.map((result, index) => {
            // Vérifier si Next.js est utilisé dans l'un des chemins de technologie
            const isNextJsUsed = result.Result.Paths.some(path => 
                path.Technologies.some(tech => tech.Name === 'Next.js') 
            );
            return {
                url: urls[index],  // Assurez-vous que l'ordre des URLs correspond à celui des résultats
                isNextJsUsed
            };
        });
        
        return results;
    } catch (error) {
        console.error('Erreur lors de l’appel à API BuiltWith:', error);
        throw error; // Propager l'erreur pour traitement ultérieur
    }
}


function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}


export async function verifyOrganizationsWithNextJs(entities) {
    const websiteUrls = entities.map(entity => entity.properties.website_url);
    const urlChunks = chunkArray(websiteUrls, 16); // Crée des lots de 16 URLs

    const results = [];

    for (const urls of urlChunks) {
        const partialResults = await lookupBuiltWith(urls);
        results.push(...partialResults); // Vous devez adapter lookupBuiltWith pour qu'elle retourne les résultats dans un format que vous pouvez regrouper ici
    }

    // Recombiner les résultats avec les entités originales pour ajouter le flag 'isNextJsUsed'
    const verifiedEntities = entities.map(entity => {
        const result = results.find(r => r.url === entity.properties.website_url);
        return { ...entity, isNextJsUsed: result ? result.isNextJsUsed : false };
    });

    return verifiedEntities;
}