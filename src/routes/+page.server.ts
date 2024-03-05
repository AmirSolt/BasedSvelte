


export const load = async ({locals}) => {

    let customer:Customer|null  = null
    if ( locals.user != null ) {
        const customers = await locals.pb.collection('customers').getFullList({
            filter: `user="${locals.user.id}"`
        }) as Customer[]
        if(customers.length>0){
            customer = customers[0]
        }
    }


    return {
        user: locals.user,
        customer
    }

};