"use client"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"


let browserQueryclient : QueryClient | undefined=undefined;

function makeQueryClient() {
    return new QueryClient();
}

function getQueryClient() {
    // we are on server
    if (typeof window === undefined) {
        return makeQueryClient();
    }else {
        //on client 
        if (!browserQueryclient) {
            browserQueryclient = makeQueryClient();
        }
        return browserQueryclient;
    }


}




const queryClient = getQueryClient();

export function QueryProvider({ children }: { children: React.ReactNode }) {

    return <>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>

    </>
}