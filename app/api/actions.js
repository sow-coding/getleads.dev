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
    const urlList = urls.map(url => normalizeUrl(url)).join(',');
    const builtWithUrl = `https://api.builtwith.com/v21/api.json?KEY=${apiKey}&LIVEONLY=yes&HIDETEXT=yes&NOMETA=yes&NOPII=yes&NOLIVE=yes&NOATTR=yes&LOOKUP=${urlList}`;

    try {
        const response = await fetch(builtWithUrl);
        if (!response.ok) throw new Error('Réponse non valide de BuiltWith');

        const data = await response.json();
        const results = {};
        data.Results.forEach((result) => {
            // Récupérer les noms de toutes les technologies détectées pour cette URL
            const detectedTechs = result.Result.Paths.flatMap(path => path.Technologies.map(tech => tech.Name));
            // Vérifier si toutes les technologies dans la stack sont présentes
            const isStackFullyUsed = stack.every(tech => detectedTechs.includes(tech));
            results[normalizeUrl(result.Lookup)] = isStackFullyUsed;
        });
        return results;
    } catch (error) {
        console.error('Erreur lors de l’appel à API BuiltWith:', error);
        throw error;
    }
}

async function lookupWithHunter(url, stack) {
    const apiKey = process.env.HUNTER_API_KEY;
    const hunterUrl = `https://api.hunter.io/v2/domain-search?domain=${url}&api_key=${apiKey}`;

    try {
        const response = await fetch(hunterUrl);
        if (!response.ok) throw new Error('Réponse non valide de Hunter');

        const data = await response.json();
        // Ici, nous supposons que 'technologies' est un tableau de noms de technologies sous 'data.data.technologies'
        const detectedTechs = data.data.technologies;

        // Vérifier si toutes les technologies dans la stack sont présentes dans les technologies détectées
        const isStackFullyUsed = stack.every(tech => detectedTechs.includes(tech));

        return isStackFullyUsed;
    } catch (error) {
        console.error('Erreur lors de l’appel à API Hunter:', error);
        return false; // Retourne false en cas d'erreur pour éviter de fausses positives
    }
}

export async function verifyOrganizationsWithStack(entities, stack) {
    const websiteUrls = entities.map(entity => entity.properties.website_url);
    const urlChunks = chunkArray(websiteUrls, 16);
    let results = {};

    const specificTechs = ["React", "AngularJS", "Angular", "Next.js", "Ember.js", "Node.js", "Meteor"];

    for (const urls of urlChunks) {
        const hunterResults = await Promise.all(urls.map(url => {
            if (stack.length === 1 && specificTechs.includes(stack[0])) {
                return lookupWithHunter(url, stack);
            }
            return Promise.resolve(false);
        }));

        let builtWithNeeded = urls.filter((url, index) => !hunterResults[index]);
        if (builtWithNeeded.length > 0) {
            const builtWithResults = await lookupBuiltWith(builtWithNeeded, stack);
            builtWithNeeded.forEach((url) => {
                results[normalizeUrl(url)] = builtWithResults[normalizeUrl(url)];
            });
        }

        urls.forEach((url, index) => {
            if (results[normalizeUrl(url)] === undefined) {
                results[normalizeUrl(url)] = hunterResults[index];
            }
        });
    }
    const verifiedEntities = entities.filter(entity => {
        return results[normalizeUrl(entity.properties.website_url)];
    });

    return verifiedEntities;
}


