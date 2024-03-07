
import { stripe } from "$lib/stripe.server";
import type Stripe from "stripe";
import {PUBLIC_DOMAIN} from '$env/static/public';
import { redirect } from "@sveltejs/kit";



export const load = async ({locals}) => {
  if ( locals.user == null ) {
    throw redirect(302, "/")
  }
  

  let customer:Customer|undefined|null
  try{
    customer = await locals.pb.collection('customers').getFirstListItem(`user.id="${locals.user.id}"`);
  } catch(e){
    console.log("customer error: ",e)
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