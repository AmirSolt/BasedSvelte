import { redirect } from '@sveltejs/kit';

export const load = async ({locals}) => {
    if( locals.user == null ) {
        throw redirect(302, "/")
    }

    return {
        user: locals.user
    }
};