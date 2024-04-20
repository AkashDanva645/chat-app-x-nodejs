import { z } from "zod";
import { uuidSchema, dateSchema } from "./sharedSchema";


const UserGroupSchema = z.object({
    id: uuidSchema,
    role: z.enum(["ADMIN", "PARTICIPANT"]),
    userId: uuidSchema,
    groupId: uuidSchema,
    createdAt: dateSchema,
    updatedAt: dateSchema,
    isDeleted: z.boolean(),
    deletedAt: dateSchema
});

export type UserGroupDTO = z.infer<typeof UserGroupSchema>

export const CreateUserGroupSchema = UserGroupSchema.pick({
    userId: true,
    groupId: true,
    role: true
});

export type CreateUserGroupDTO = z.infer<typeof CreateUserGroupSchema>

export const UpdateUserGroupSchema = UserGroupSchema.pick({
    role: true
}).partial();