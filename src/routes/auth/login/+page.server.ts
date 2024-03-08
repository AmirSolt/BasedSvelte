import { redirect, error } from '@sveltejs/kit';
import { z } from "zod";

const LoginSchema = z.object({
	email: z.string().email().min(1),
	password: z.string().min(1),
  });


export const load = async ({locals}) => {
	if ( locals.user != null ) {
	  throw error(403, {message:"You can not be logged in to use this route."})
	}
}


export const actions = {
    login: async ({ locals, request }) => {
		if ( locals.user != null ) {
			throw error(403, {message:"You can not be logged in to use this route."})
		}

		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		

		// validation
		const validationResponse = LoginSchema.safeParse({
			email,
			password,
		})
		if ( !validationResponse.success){
			throw error(400, {
				message: validationResponse.error.message
			})
		}

        const response = await locals.pb.collection("users").authWithPassword(email, password) 

		console.log("===== Login =====")
        console.log(response)


		const dest = data.get('dest');
		if (dest!=null && dest!="null" && dest.toString().length > 0){
			console.log(" >>>>> ",decodeURIComponent(dest.toString()))
			throw redirect(302, decodeURIComponent(dest.toString()))
		}

		throw redirect(302, "/")
	},
};