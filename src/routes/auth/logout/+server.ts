import { redirect, error } from "@sveltejs/kit";

export const POST = async ({locals}) => {
    
    if(locals.user==null){
        throw error(400, {message:"Unauthorized!"})
    }
    const response = locals.pb.authStore.clear();
    console.log("===== log out =====")
    console.log(response)

    throw redirect(302, "/");
};