"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/http/api';
import { Product } from '@/types';

function Page() {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <>
      <div className='flex items-center justify-between py-2'>
        <h3 className='text-2xl font-bold tracking-tight'>Products</h3>
        <Button size={'sm'}>Add Product</Button>
      </div>
      <DataTable columns={columns} data={products || []} />
    </>
  );
}

export default Page;
