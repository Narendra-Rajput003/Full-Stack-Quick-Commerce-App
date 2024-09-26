
import {z} from "zod"




export const deliveryPersonSchema = z.object({
    name:z.string({message:"Delivery person name should be a string"}),
    phone:z.string({message:"Phone should be a string"}).length(13,"Delivery person be at least 13 char long"),
    warehouseId:z.number({message:"warehouseId should be number"})


})