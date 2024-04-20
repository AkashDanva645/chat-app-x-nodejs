
import { z } from "zod";
import { uuidSchema, dateSchema } from "./sharedSchema";

const ContactSchema = z.object({
    id: uuidSchema,
    name: z.string(),
    ownerId: uuidSchema,
    personId: uuidSchema,
    createdAt: dateSchema,
    updatedAt: dateSchema.nullable(),
    isDeleted: z.boolean(),
    deletedAt: dateSchema.nullable()
});

export type ContactDTO = z.infer<typeof ContactSchema>

export const CreateContactSchema = ContactSchema.pick({
    name: true,
    ownerId: true,
    personId: true
});

export type CreateContactDTO = z.infer<typeof CreateContactSchema>

export const UpdateContactSchema = ContactSchema.omit({
    id: true
}).partial();

export type UpdateContactDTO = z.infer<typeof UpdateContactSchema>

export const UserCreatesContactSchema = ContactSchema.pick({
    name: true,
    personId: true
});

export default ContactSchema;