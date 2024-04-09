export async function POST (request: Request) {

    const res = await request.json()

    const requestBody = {
        field_ids: ["identifier", "categories", "location_identifiers", "short_description", "rank_org"],
        order: [{ field_id: "rank_org", sort: "asc"}],
        query: [
          { type: "predicate", field_id: "num_employees_enum", operator_id: "includes", values: ["c_00101_00250"] },
          { type: "predicate", field_id: "categories", operator_id: "includes", values: ["software"] },
        ],
        limit: 50
      };
    
    const organizations = await fetch("https://api.crunchbase.com/api/v4/searches/organizations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-cb-user-key": process.env.CRUNCHBASE_API_KEY!
        },
        body: JSON.stringify(requestBody),
    })
    
    console.log(organizations)
    return Response.json({ organizations})
}