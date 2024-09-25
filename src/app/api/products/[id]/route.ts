import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";



export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const product = await db.select().from(products).where(eq(products.id, Number(id))).limit(1);

        if(!product.length){
         return Response.json({message:"Product not found"},{status:400})
        }

        return Response.json(product[0]) 

    } catch (error) {
        console.log(error);
        return Response.json({ message: "Failed to fetch the signle product" }, { status: 500 })

    }


}