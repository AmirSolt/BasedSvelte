
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
  subscribe: async ({ locals, request, url }) => {
    if ( locals.user == null ) {
      throw error(403, {message:"Unauthorized"})
    }

    const data = await request.formData();
    const priceID = data.get('priceID') as string;

    // validation
    const validationResponse = CheckoutRequestSchema.safeParse({
      priceID,
    })
    if ( !validationResponse.success){
      throw error(400, {
        message: validationResponse.error.message
      })
    }


    let customer:Customer|undefined|null
    try{
      customer = await locals.pb.collection('customers').getFirstListItem(`user.id="${locals.user.id}"`);
    } catch(e){
      console.log("customer error: ",e)
    }
  

  if(customer==null || customer.stripe_subscription_id==null || customer.stripe_subscription_id==""){
    console.log(">>> checkout")
    await checkout(priceID, customer, locals.user)
  } else {
    console.log(">>> subsc update")
    await updatePrice(priceID, customer, locals.user)
  }

  },
};



async function checkout(priceID:string, customer:Customer|null|undefined, user:User){

  let customerID:string|undefined
  let email:string|undefined
  if (customer!=null){
    customerID = customer.stripe_customer_id
  } else {
    email = user.email
  }

  const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price:priceID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${PUBLIC_DOMAIN}/payment/success`,
      cancel_url: `${PUBLIC_DOMAIN}/payment/pricing`,
      customer:customerID,
      customer_email:email,
  });
  if (checkoutSession.url==null) {
      throw error(400, {
          message: "Error: Could not create checkout",
      })
  }

  throw redirect(302, checkoutSession.url)
}

async function updatePrice(priceID:string, customer:Customer, user:User){

  
const subscription = await stripe.subscriptions.retrieve(
  customer.stripe_subscription_id
);


  const newSubscription = await stripe.subscriptions.update(
    customer.stripe_subscription_id,
    {
      items: [
        {
          id: subscription.items.data[0].id,
          price: priceID,
        },
      ],
    }
  );

  throw redirect(302, "/payment/wallet")
}