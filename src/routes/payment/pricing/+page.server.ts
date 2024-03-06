
import { stripe } from "$lib/stripe.server";
import type Stripe from "stripe";

export const load = async ({locals}) => {
  
  let customer:Customer|undefined
  if ( locals.user != null ) {
      const customers = await locals.pb.collection('customers').getFullList({
          filter: `user="${locals.user.id}"`
      }) as Customer[]
      if(customers.length>0){
          customer = customers[0]
      }
  }

  let customerSession:Stripe.CustomerSession|undefined
  if (customer != null) {
    customerSession = await stripe.customerSessions.create({
      customer: customer.stripe_customer_id,
      components: {
        pricing_table: {
          enabled: true,
        },
      },
    });
  }
  
  
  return {
    user:locals.user,
    customer:customer,
    customerSession:customerSession,

  }

};