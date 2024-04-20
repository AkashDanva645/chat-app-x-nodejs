import { z } from "zod";
import { uuidSchema, dateSchema, urlSchema } from "./sharedSchema";

const groupNameSchema = z.string();

const GroupSchema = z.object({
    id: uuidSchema,
    name: groupNameSchema,
    profilePicUrl: urlSchema.optional(),
    createdAt: dateSchema,
    updatedAt: dateSchema,
    isDeleted: z.boolean(),
    deletedAt: dateSchema
});

export type GroupDTO = z.infer<typeof GroupSchema>

export const CreateGroupSchema = GroupSchema.pick({
    name: true,
    profilePicUrl: true
});

export type CreateGroupDTO = z.infer<typeof CreateGroupSchema>

export const UpdateGroupSchema = GroupSchema.pick({
    name: true,
    profilePicUrl: true
}).partial();

export type UpdateGroupDTO = z.infer<typeof UpdateGroupSchema>

