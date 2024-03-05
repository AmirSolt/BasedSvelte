import { redirect } from '@sveltejs/kit';

export const actions = {
    login: async ({ locals, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

        const authData = await locals.pb.collection('users').authWithPassword(email, password) 


        console.log(authData)

		throw redirect(302, "/")
	},
};