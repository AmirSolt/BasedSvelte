import { error } from '@sveltejs/kit';



export const load = async ({locals}) => {




    return {
        user: locals.user,
    }
};