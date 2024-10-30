
import { create } from "zustand";





type NewProductStat={
    isOpen:boolean,
    onOpen:()=>void,
    onClose:()=>void

}

export const useNewProduct =create<NewProductStat>((set)=>{
    return{
        isOpen:false,
        onOpen:()=>set({isOpen:true}),
        onClose:()=>set({isOpen:false})
    }
})

