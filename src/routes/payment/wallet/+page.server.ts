
import { stripe } from "$lib/stripe.server";
import type Stripe from "stripe";
import {PUBLIC_DOMAIN} from '$env/static/public';
import { redirect } from "@sveltejs/kit";



export const load = async ({locals}) => {
  if ( locals.user == null ) {
    throw redirect(302, "/")
  }
  
  let customer:Customer|undefined
  const customers = await locals.pb.collection('customers').getFullList({
      filter: `user="${locals.user.id}"`
  }) as Customer[]
  if(customers.length>0){
      customer = customers[0]
  }



  let session:Stripe.BillingPortal.Session|undefined
  if (customer != null) {
    session = await stripe.billingPortal.sessions.create({
      customer: customer.stripe_customer_id,
      return_url: PUBLIC_DOMAIN,
    });
  }

  if (session == null) {
    throw redirect(302, "/payment/pricing")
  }

  throw redirect(302, session.url)
};