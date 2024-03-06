import { redirect, error } from '@sveltejs/kit';
import { z } from "zod";

const SignupSchema = z.object({
	email: z.string().email().min(1),
	password: z.string().min(1),
});


export const load = async ({locals}) => {
	if ( locals.user != null ) {
	  throw error(403, {message:"You can not be logged in to use this route."})
	}
}

export const actions = {
    signup: async ({ locals, request }) => {
		if ( locals.user != null ) {
			throw error(403, {message:"You can not be logged in to use this route."})
		}


		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		// validation
		const validationResponse = SignupSchema.safeParse({
			email,
			password,
		})
		if ( !validationResponse.success){
			throw error(400, {
				message: validationResponse.error.message
			})
		}

		const responseRegister = await locals.pb.collection("users").create({
			email: email,
			password: password,
			passwordConfirm: password,
		});
		console.log("===== register =====")
        console.log(responseRegister)


		const responseLogin = await locals.pb.collection("users").authWithPassword(email, password) 
		console.log("===== Login =====")
        console.log(responseLogin)


		throw redirect(302, "/")
	},
};