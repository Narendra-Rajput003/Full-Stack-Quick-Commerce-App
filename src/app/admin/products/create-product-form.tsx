


import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema } from '@/lib/validators/productSchema'
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { useCallback } from 'react'

export type FormValues = z.input<typeof productSchema>

function CreateProductForm({ onSubmit, disabled }: {
  onSubmit: (formValus: FormValues) => void;
  disabled: boolean;
}) {


  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0
    }

  })

  const handleSubmit = useCallback((values: FormValues) => {
    onSubmit(values)
  }, [onSubmit])


  const fileRef = form.register("image")




  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Chocobar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image field  */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input type='file' {...fileRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />



        {/* Image manage second method */}

        {/* <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, ...rest } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input 
                  type='file' 
                  onChange={(e) => onChange(e.target.files?.[0])}
                  {...rest}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type='number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}

        />
        <Button className='w-full' disabled={disabled}>
          {disabled ? <Loader2 className='size-4 animate-spin' /> : 'Create'}
        </Button>
      </form>
    </Form>

  )
}

export default CreateProductForm