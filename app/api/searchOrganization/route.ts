export async function POST(request: Request) {

  //choper les données de la requête pour les utiliser dans la requête à l'API

  const requestBody = {
    field_ids: ["identifier", "location_identifiers", "short_description", "website_url", "categories"],
    order: [{ field_id: "rank_org", sort: "asc"}],
    query: [
      { type: "predicate", field_id: "num_employees_enum", operator_id: "includes", values: ["c_00101_00250"] },
      { type: "predicate", field_id: "categories", operator_id: "includes", values: ["software"] },
      { type: "predicate", field_id: "location_identifiers", operator_id: "includes", values: ["France"]}
    ],
    limit: 1
  };

  const response = await fetch("https://api.crunchbase.com/api/v4/searches/organizations", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "X-cb-user-key": process.env.CRUNCHBASE_API_KEY!
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
  return new Response(JSON.stringify(data.entities), {
      status: 200,
      headers: {
          "Content-Type": "application/json",
      },
  });
}