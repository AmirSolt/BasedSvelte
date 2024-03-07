
import { stripe } from "$lib/stripe.server";
import { error, redirect } from "@sveltejs/kit";
import type Stripe from "stripe";
import { z } from "zod";
import { PUBLIC_DOMAIN } from "$env/static/public";

export const load = async ({locals}) => {

  const prices = await stripe.prices.list();  
    
  return {
    user:locals.user,
    prices:prices.data,
  }
};




const CheckoutRequestSchema = z.object({
	priceID: z.string().min(1),
});

export const actions = {
  checkout: async ({ locals, request, url }) => {
    if ( locals.user == null ) {
      throw error(403, {message:"Unauthorized"})
    }

    const data = await request.formData();
    const priceID = data.get('priceID');

    // validation
    const validationResponse = CheckoutRequestSchema.safeParse({
      priceID,
    })
    if ( !validationResponse.success){
      throw error(400, {
        message: validationResponse.error.message
      })
    }


  let customer:Customer|undefined
  if ( locals.user != null ) {
      const customers = await locals.pb.collection('customers').getFullList({
          filter: `user="${locals.user.id}"`
      }) as Customer[]
      if(customers.length>0){
          customer = customers[0]
      }
  }


    const checkoutSession = await stripe.checkout.sessions.create({
        line_items: [
          {
            price:priceID?.toString(),
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${PUBLIC_DOMAIN}/payment/success`,
        cancel_url: `${PUBLIC_DOMAIN}/payment/pricing`,
        customer:customer?.stripe_customer_id,
        customer_email:locals.user.email,
    });
    if (checkoutSession.url==null) {
        throw error(400, {
            message: "Error: Could not create checkout",
        })
    }


    throw redirect(302, checkoutSession.url)
  },
};