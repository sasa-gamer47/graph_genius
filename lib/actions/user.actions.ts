import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    userId: string | number | Record<string, string>[];
    username: string | number | Record<string, string>[];
    path: string;
}

export async function createUser({
    userId,
    path,
    username,
    }: Params): Promise<void> {
    try {
        connectToDB();

        console.log('data: ', userId, username);
        

        const user = await User.create(
        {
            userId,    
            username: typeof username === "string" ? username.toLowerCase() : username,
            onboarded: true,
        },
        // { upsert: true }
        );

        
        console.log("new user: ", user)

        // if (path === "/profile/edit") {
            //     revalidatePath(path);
            // }
        // return user
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
}