import { pb } from "$lib/server/services/pocketbase"



export const load = async () => {


    const userData = await pb.collection('users').authWithPassword<User>('killop1997@gmail.com', ']f1K;7xJ^]75');
    const customersData = await pb.collection('customers').getFullList<Customer[]>({
        filter: `user="${userData.record.id}"`
    })


    return {
        userData,
        customerData:customersData[0]
    }

};