import { redirect, error } from '@sveltejs/kit';
import { z } from "zod";


const RequestPasswordResetSchema = z.object({
	email: z.string().email().min(1),
});

export const actions = {
    reset: async ({ locals, request }) => {
		const data = await request.formData();
		const email = data.get('email');

		// validation
		const validationResponse = RequestPasswordResetSchema.safeParse({
			email,
		})
		if ( !validationResponse.success){
			throw error(400, {
				message: validationResponse.error.message
			})
		}

		const response = await locals.pb.collection('users').requestPasswordReset(email);
		console.log("===== requestPasswordReset =====")
        console.log(response)


		throw redirect(302, `/auth/password/sent`)
	},
};