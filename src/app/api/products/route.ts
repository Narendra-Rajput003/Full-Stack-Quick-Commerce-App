
import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { productSchema } from "@/lib/validators/productSchema";
import { desc } from "drizzle-orm";
import { writeFile ,unlink} from "fs/promises";
import path from "path";

export async function POST(request:Request){
    const data=await request.formData();

    let validateData;
    try {
        
        validateData=productSchema.parse({
            name:data.get('name'),
            description:data.get('description'),
            price:Number(data.get('price')),
            image:data.get('image'),

        })
    } catch (error) {
        return Response.json({message:error},{status:400})
        
    }

    const image=validateData.image as File;
    const fileExtension=path.extname(image.name);   //path.extname() to get getting file extensions


    //Validate file type early 

    const allowedExtensions=['.jpg','.png','.jpeg','.webp'];
    if(!allowedExtensions.includes(fileExtension.toLowerCase())){
        return Response.json({message:"Invalid file type"}, {status:400})
    }

    const filename = `${Date.now()}${fileExtension}`;
    const filePath = path.join(process.cwd(), "public/assets", filename);
    console.log("filename",filename)

    try {
       const buffer=Buffer.from (await image.arrayBuffer());
       await writeFile(filePath,buffer)
       
       try {
        await db.insert(products).values({...validateData,image:filename})
        return Response.json({message:"Product saved successfully"}, {status:200})
        
       } catch (error) {
        await unlink(filePath);
        console.error("Database insert failed:", error);
        return Response.json({message:"Failed to save the product to db"}, {status:500})
        
       }
        
    } catch (error) {
        
        return Response.json({message:"Failed to save the file to fs"},{status:500})
    }

}


export async function GET(request:Request){
    try {
        const allProducts=await db.select().from(products).orderBy(desc(products.id));
        return Response.json({
            message:"All products fetched successfully"
        },{status:201})
        
    } catch (error) {
        console.log(error);
        return Response.json({message:"Failed to fetch products"},{status:500})
        
    }
}

    

   

