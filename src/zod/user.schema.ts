import { z } from "zod";
import { uuidSchema, dateSchema } from "./sharedSchema";

export const usernameSchema = z.string().refine(val => {
    if (val.length > 30) return false;
    if (!(/^[a-zA-Z0-9]+$/.test(val))) return false;
    return true;
}, {
    message: "username should only contain alphanumeric characters and must be less than 30 characters long"
});

export const emailSchema = z.string().email("Provided email has invalid format.");

const aliasSchema = z.string();

const firstnameSchema = z.string().refine(val => {
    if (!(/^[a-zA-Z]+$/.test(val))) return false;
    return true;
}, {
    message: "firstname can only contain letters."
})

const lastnameSchema = z.string().refine((val: string) => {
    if (!(/^[a-zA-Z]+$/.test(val))) return false;
    return true;
}, {
    message: "lastname can only contain letters."
})

export const passwordSchema = z.string();

export const phoneNumberSchema = z.string().refine(val => val.length === 10, {
    message: 'Phone Number must be of exactly 10 characters long'
});

const bioSchema = z.string();

const profilePicUrlSchema = z.string();



// Persistent User
export const UserSchema = z.object({
    id: uuidSchema,
    username: usernameSchema,
    email: emailSchema,
    alias: aliasSchema,
    firstname: firstnameSchema.nullable().default(null),
    lastname: lastnameSchema.nullable().default(null),
    password: passwordSchema,
    phoneNumber: phoneNumberSchema,
    bio: bioSchema.nullable().default(null),
    profilePicUrl: profilePicUrlSchema.nullable().default(null),
    createdAt: dateSchema,
    updatedAt: dateSchema.nullable().default(null),
    isDeleted: z.boolean(),
    deletedAt: dateSchema.nullable().default(null)
});

export type UserDTO = z.infer<typeof UserSchema>;


export const CreateUserSchema = UserSchema.pick({
    username: true,
    email: true,
    alias: true,
    firstname: true,
    lastname: true,
    phoneNumber: true,
    password: true,
    bio: true,
    profilePicUrl: true,
})

export type CreateUserDTO = z.infer<typeof CreateUserSchema>

export const UpdateUserSchema = CreateUserSchema.partial();

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>




export default UserSchema;