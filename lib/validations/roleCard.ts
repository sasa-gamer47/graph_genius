import * as z from "zod";

export const RoleCardValidation = z.object({
    role: z.string().optional(),
    username: z.any().optional(),
    userId: z.any().optional(),
});
