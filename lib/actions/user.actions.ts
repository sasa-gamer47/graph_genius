import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    userId: string | number | Record<string, string>[];
    username: string | number | Record<string, string>[];
    // path: string;
    role: string;
}



export async function createUser({
    userId,
    // path,
    username,
    role,
    }: Params): Promise<void> {
    try {
        connectToDB();

        console.log('creating user');
        

        console.log('data: ', userId, username);
        

        const user = await User.create(
        {
            userId,    
            username: typeof username === "string" ? username.toLowerCase() : username,
            onboarded: true,
            role,
        },
        // { upsert: true }
        );

        
        console.log("new user: ", user)

        // if (path === "/profile/edit") {
            //     revalidatePath(path);
            // }
        return user
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
}

export async function getUserById(id: string) {
    try {
        connectToDB()

        // const users = await User.find()

        const user = await User.findOne({ id })
        
        // console.log(user);
        

        return user
    } catch (error: any) {
        throw new Error(`Something went wrong while fetching user: ${error.message}`)
    }
}


export async function deleteUserById(id: string) {
    try {
        connectToDB()

        // const users = await User.find()

        const user = await User.deleteOne({ id })
        
        // console.log(user);
        

        return user
    } catch (error: any) {
        throw new Error(`Something went wrong while deleting user: ${error.message}`)
    }
}