import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    userId: string;
    username: string;
    path: string;
}

export async function createUser({
    userId,
    path,
    username,
    }: Params): Promise<void> {
    try {
        connectToDB();

        await User.findOneAndUpdate(
        { id: userId },
        {
            username: username.toLowerCase(),
            onboarded: true,
        },
        { upsert: true }
        );

        // if (path === "/profile/edit") {
        //     revalidatePath(path);
        // }
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
}