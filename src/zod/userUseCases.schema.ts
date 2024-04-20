import { z } from "zod";

import { uuidSchema } from "./sharedSchema";
import { UserSchema, passwordSchema, phoneNumberSchema } from "./user.schema";
import ContactSchema, { CreateContactSchema } from "./contact.schema";

export const UserSignUpSchema = UserSchema.pick({
    username: true,
    email: true,
    alias: true,
    firstname: true,
    lastname: true,
    phoneNumber: true,
    password: true,
    bio: true,
    profilePicUrl: true,
}).extend({
    passwordConfirm: passwordSchema
});

export type UserSignUpDTO = z.infer<typeof UserSignUpSchema>


export const SignedUpUserSchema = UserSchema.pick({
    username: true,
    email: true,
    alias: true,
    firstname: true,
    lastname: true,
    phoneNumber: true
});

export type SignedUpUserDTO = z.infer<typeof SignedUpUserSchema>


export const UserCredsSchema = UserSchema.pick({
    password: true
}).extend({
    emailOrUsername: z.string(),
});

export type UserCredsDTO = z.infer<typeof UserCredsSchema>


export const LoggedInUserSchema = UserSchema.pick({
    username: true,
    email: true,
}). extend({
    token: z.string()
})

export type LoggedInUserDTO = z.infer<typeof LoggedInUserSchema>


export const JwtDataSchema = UserSchema.pick({
    username: true,
    email: true
});

export type JwtDataDTO = z.infer<typeof JwtDataSchema>



export const UserCreatesContactSchema = ContactSchema.pick({
    name: true
}).extend({
    phoneNumber: phoneNumberSchema
});

export type UserCreatesContactDTO = z.infer<typeof UserCreatesContactSchema>