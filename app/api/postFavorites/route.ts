import { supabase } from "@/utils/supabase/auth";
import { revalidatePath } from "next/cache";

export async function POST (request: Request) {
    const req = await request.json();
    
    const { data, error } = await supabase
    .from('favorites')
    .insert([
      { userId: req.userId, organization: req.organization, id: req.id },
    ])
    .select()
            
    revalidatePath("favorites")
    
    if (error) {
        console.error('Error fetching favorites:', error.message)
    }

    return new Response("Ok")
}