import { db } from "@/lib/db/db";
import { warehouses } from "@/lib/db/schema";
import { warehouseSchema } from "@/lib/validators/warehouseSchema";


export async  function POST(request:Request){
       
        const requestBody=await request.json();

        let validatedData;

        try {
            
            validatedData= warehouseSchema.parse(requestBody);

        } catch (error) {
            console.log(error);
           return Response.json({message:"Failed to validated data in  warehouses"},{status:500})
        }
        
        try {
            
            await db.insert(warehouses).values(validatedData);
            return Response.json({message:"warehouse created successfully"},{status:201});
        } catch (error) {
            console.log(error);
            return Response.json({message:"Failed to store data in  warehouses"},{status:500})
            
        }
}