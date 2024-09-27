import { db } from "@/lib/db/db";
import { deliveryPersons, warehouses } from "@/lib/db/schema";
import { deliveryPersonSchema } from "@/lib/validators/delivery-personSchema";
import { desc, eq } from "drizzle-orm";



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


export async function  GET() {

    try {
        const DeliveryPersons=await db.select({
            id:deliveryPersons.id,
            name:deliveryPersons.name,
            phone:deliveryPersons.phone,
            warehouse:warehouses.name
        }).from(deliveryPersons).leftJoin(warehouses,eq(deliveryPersons.warehouseId,warehouses.id)).orderBy(desc(deliveryPersons.id));
        return Response.json(DeliveryPersons)

    } catch (error) {
        console.log(error)
        return Response.json({message:"failed to fetch  delivery person "},{status:500})
        
    }
    
}


