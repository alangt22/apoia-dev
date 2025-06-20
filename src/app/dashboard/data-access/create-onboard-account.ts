"use server"

import { stripe } from "@/lib/stripe"

export async function getLoginOnboardAccount(accountId: string | undefined) {
     if(!accountId){
        return null;
     }

     try {

        const accountLink = await stripe.accountLinks.create({
            account: accountId,
            refresh_url: "https://apoia-dev-brown.vercel.app/dashboard",
            return_url: "https://apoia-dev-brown.vercel.app/dashboard",
            type: "account_onboarding",
        });

        return accountLink.url;
        
     } catch (error) {
        console.error("Error creating onboard account:", error);
        return null;
     }
}