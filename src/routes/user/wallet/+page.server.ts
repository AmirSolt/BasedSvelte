
import { stripe } from "$lib/server/services/stripe";


export const load = async () => {
  
  const session = await stripe.billingPortal.sessions.create({
    customer: 'cus_NciAYcXfLnqBoz',
    return_url: 'https://example.com/account',
  });


};