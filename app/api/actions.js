export async function lookupBuiltWith(websiteUrl) {

    const apiKey = process.env.BUILTWITH_API_KEY;
    console.log(websiteUrl)
    const builtWithUrl = `https://api.builtwith.com/v21/api.json?KEY=${apiKey}&LIVEONLY=yes&LOOKUP=${websiteUrl}`;

    try {
        const response = await fetch(builtWithUrl);
        if (!response.ok) throw new Error('Réponse non valide de BuiltWith');
        
        const data = await response.json();
        console.log('Réponse de BuiltWith:', data.Results[0].Result.Paths);
        // Analyser la réponse pour vérifier l'utilisation de Next.js
        const isNextJsUsed = data.Results[0].Result.Paths.some(path => 
            path.Technologies.some(tech => tech.Name === 'Next.js')
        );
        console.log('Next.js utilisé:', isNextJsUsed)
        return isNextJsUsed;
    } catch (error) {
        console.error('Erreur lors de lappel à API BuiltWith:', error);
        throw error; // Propager l'erreur pour traitement ultérieur
    }
}

export async function verifyOrganizationsWithNextJs(entities) {
    const checks = entities.map(async entity => {
        const websiteUrl = entity.properties.website_url;
        // Faire l'appel à votre endpoint API intermédiaire qui vérifie l'utilisation de Next.js
        const response = await fetch('/api/checkStack', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: websiteUrl })
        });

        if (!response.ok) {
            console.error("Erreur lors de la vérification de l'utilisation de Next.js");
            return null;
        }
        
        const { isNextJsUsed } = await response.json();
        return { ...entity, isNextJsUsed };
    });

    return Promise.all(checks);
}