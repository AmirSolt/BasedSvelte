
import { stripe } from "$lib/server/services/stripe";


export const load = async () => {
  
  const customerSession = await stripe.customerSessions.create({
    customer: 'cus_PO34b57IOUb83c',
    components: {
      pricing_table: {
        enabled: true,
      },
    },
  });
  


};