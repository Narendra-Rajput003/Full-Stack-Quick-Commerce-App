import { db } from "@/lib/db/db";
import { deliveryPersons } from "@/lib/db/schema";
import { deliveryPersonSchema } from "@/lib/validators/delivery-personSchema";



export async function POST(request:Request) {

    const requestData=await request.json();

    let validateData;

    try {
      validateData= deliveryPersonSchema.parse(requestData);

    } catch (error) {
        console.log(error)
        return Response.json({message:"failed to create delivery person "},{status:500})
    }

    try {
        await db.insert(deliveryPersons).values(validateData);

         return Response.json({message:"Ok "},{status:201})
    } catch (error) {
        console.log(error)
        return Response.json({message:"failed to store the delivery person datat "},{status:500})
        
    }
    
}