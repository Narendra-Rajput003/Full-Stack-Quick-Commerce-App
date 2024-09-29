import { db } from "@/lib/db/db";
import { inventories, products, warehouses } from "@/lib/db/schema";
import { inventorySchema } from "@/lib/validators/inventorieSchema";
import { desc, eq } from "drizzle-orm";


export async function POST(request: Request) {


    const requestBody = await request.json();

    let validateData;

    try {
        validateData = inventorySchema.parse(requestBody);
        console.log('Validated Data:', validateData);

        const result = await db.insert(inventories).values(validateData);
        console.log('Insert Result:', result);
        return Response.json({ message: 'OK' }, { status: 201 })
    } catch (error: any) {
        console.error('Error inserting into database:', error);
        return Response.json({ message: "failed to create inventories 0", error: error.message }, { status: 500 })


    }
}

export async function GET() {
    try {

        const allInventories = await db.select({
            id: inventories.id,
            sku: inventories.sku,
            warehouses:warehouses.name,
            product:products.name
        }).
        from(inventories).leftJoin(warehouses, eq(inventories.warehouseId, warehouses.id))
        .leftJoin(products, eq(inventories.productId, products.id))
        .orderBy(desc(inventories.id))
        return Response.json(allInventories);

    } catch (error) {
        console.log(error)
        return Response.json({ message: "failed to get all inventories " }, { status: 500 })


    }
}