export async function POST (request) {

    const inputRequestBody = await request.json();
    const { id } = inputRequestBody;
    const requestBody = {
      field_ids: ["gender", "name", "linkedin", "primary_job_title", "primary_organization"],
      query: [
        { type: "predicate", field_id: "primary_organization", operator_id: "contains", values: [id] },
      ]
    };
  
    const response = await fetch("https://api.crunchbase.com/api/v4/searches/people", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-cb-user-key": process.env.CRUNCHBASE_API_KEY
        },
        body: JSON.stringify(requestBody),
    });
  
    if (!response.ok) {
        // Gestion des erreurs de réponse, par exemple :
        console.error("Erreur lors de la récupération des données de l'API Crunchbase", response.statusText);
        return new Response(JSON.stringify({ error: "Erreur lors de la récupération des données" }), {
            status: response.status,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
  
    const data = await response.json(); // Convertir la réponse en JSON
    // Renvoyer uniquement le tableau 'entities' au client
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
  }