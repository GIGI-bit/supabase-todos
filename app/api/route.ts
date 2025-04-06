import { createClient } from "@/utils/supabase/server";

export async function GET(){
    const supabase=await createClient();
const {data ,error}=await supabase.from("todos").select("*").order("created_at",{ascending:false});

if(error){
    return new Response(JSON.stringify({error:error.message}),{status:500})
}

return new Response(JSON.stringify(data),{
    headers:{'Content-Type':'application/json'},
})

}

export async function POST (req:Request){
    const supabase =await createClient()
}









