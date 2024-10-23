
import { SheetContent, SheetDescription, SheetHeader, SheetTitle, Sheet } from '@/components/ui/sheet'
import React from 'react'
import CreateProductForm, { FormValues } from './create-product-form'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createProduct } from '@/http/api'
import { useToast } from '@/hooks/use-toast'
import { useNewProduct } from '@/store/product/product-store'
import { useCallback } from 'react'

const useCreateProductMutation = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const { onClose } = useNewProduct()
    
  
    return useMutation({
      mutationFn: createProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] })
        toast({ title: 'Product created successfully' });
        onClose()
      },
      onError: (error) => {
        toast({ title: 'Error creating product', description: error.message, variant: 'destructive' })
      }
    })
  }


function ProductSheet() {
    const { isOpen,onClose } = useNewProduct()

    const { mutate, isPending } = useCreateProductMutation()

    const onSubmit = useCallback((values: FormValues) => {
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('description', values.description)
        formData.append('price', String(values.price))
        
        if (values.image instanceof File) {
          formData.append('image', values.image)
        }
    
        mutate(formData)
      }, [mutate])

    return (
        <>
            <Sheet open={isOpen} onOpenChange={onClose} >
                {/* <SheetTrigger>Open</SheetTrigger> */}
                <SheetContent className='min-w-[28rem] space-y-4'>
                    <SheetHeader>
                        <SheetTitle>Create Product</SheetTitle>
                        <SheetDescription>
                            Create new Product
                        </SheetDescription>
                    </SheetHeader>
                    <CreateProductForm onSubmit={onSubmit} disabled={isPending} />
                </SheetContent>
            </Sheet>

        </>
    )
}

export default ProductSheet