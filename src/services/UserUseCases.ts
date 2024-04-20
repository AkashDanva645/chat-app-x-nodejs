
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import * as config from "../config";
import { User } from "@prisma/client";
import { z } from "zod";
import { v4 as uuid } from "uuid";

import { CreateUserDTO, UserDTO } from "../zod/user.schema";
import { CreateContactDTO, CreateContactSchema, ContactDTO } from "../zod/contact.schema";
import { UserCredsDTO, UserCredsSchema, LoggedInUserDTO, JwtDataDTO, UserSignUpDTO, SignedUpUserDTO, UserCreatesContactDTO, UserCreatesContactSchema } from "../zod/userUseCases.schema";

import AppError from "../utils/AppError";
import UserRepository from "../repository/UserRepository";
import ContactRepository from "../repository/ContactRepository";



export default class UserUseCases {
    constructor (
        private readonly _userRepo: UserRepository,
        private readonly _contactRepo: ContactRepository
    ) {}


    private async _hashPassword(pwd: string): Promise<string> { 
        return await bcrypt.hash(pwd, 10);
    }


    private async _signJWT(payload: JwtDataDTO): Promise<string> {
        let options = { expiresIn: config.JWT_EXPIRES_IN };
        return jsonwebtoken.sign(payload, config.JWT_SECRET_KEY, options);
    }


    private async _matchPassword(password: string, hashedPassword: string): Promise<boolean> { 
        return await bcrypt.compare(password, hashedPassword);
    }

    
    public async authenticate(authHeader: string): Promise<UserDTO | null> {
        const [prefix, token]: string[] = authHeader.split(" ");
        if (prefix !== "Bearer") throw new AppError("Please provide Bearer Token.", 400);

        const decoded: any = jsonwebtoken.decode(token, { complete: true});
        if (decoded === null) return null;
        
        const { username, email, exp } = decoded.payload;
        if (!username && !email) return null;
        let expDate = new Date(exp * 1000);
        if (expDate < (new Date(Date.now()))) throw new AppError("Session Expired.", 400);

        const users: User[] = await this._userRepo.findByUsernameOrEmail(username, email);
        if (users.length > 1) throw new AppError("Invalid JWT. Username and Email are not of same user", 404);
        if (!users[0]) throw new AppError("No User Exist with this JWT.", 404);
        else return users[0];
    }


    public async signup(signUpData: UserSignUpDTO): Promise<SignedUpUserDTO> {
        if (signUpData.password !== signUpData.passwordConfirm) {
            throw new AppError("Password and Confirmed Password do not match.", 400);
        }
        const hashedPassword: string = await this._hashPassword(signUpData.password);
        signUpData.password = hashedPassword;
        let { passwordConfirm, ...data1 } = signUpData;
        const createUserDTO: CreateUserDTO = {...data1, bio: null, profilePicUrl: null };
        const createdUserDTO: UserDTO = await this._userRepo.create(createUserDTO);
        let { bio, profilePicUrl, createdAt, updatedAt, deletedAt, isDeleted, password, id, ...userSignedUpDTO } = createdUserDTO;
        return userSignedUpDTO;
    }


    public async login(userCredsDTO: UserCredsDTO): Promise<LoggedInUserDTO> {
        const validCredsDTO: UserCredsDTO = UserCredsSchema.parse(userCredsDTO);
        const users: User[] = await this._userRepo.findByUsernameOrEmail(validCredsDTO.emailOrUsername, validCredsDTO.emailOrUsername);

        if (!users[0]) throw new AppError("No User exists with this Email or Username", 404);
        const user: User = users[0];

        if (!(this._matchPassword(validCredsDTO.password, user.password))) {
            throw new AppError("Password Didn't Match.", 400);
        }

        const jwtDataDTO: JwtDataDTO = {
            username: user.username,
            email: user.email,
        }
        const signedJwt: string = await this._signJWT(jwtDataDTO);
        const loggedInUserDTO: LoggedInUserDTO = {
            username: user.username,
            email: user.email,
            token: signedJwt
        }

        return loggedInUserDTO;
    }


    public async userCreatesContact(userCreatesContactDTO: UserCreatesContactDTO, contactOwnerId: string): Promise<ContactDTO> {
        userCreatesContactDTO = UserCreatesContactSchema.parse(userCreatesContactDTO);
        const contactPerson : User | null = await this._userRepo.findByPhoneNumber(userCreatesContactDTO.phoneNumber);
        if (contactPerson === null) {
            throw new AppError("No user exists with this phone number", 400);
        }
        const createContactDTO: CreateContactDTO = {
            name: userCreatesContactDTO.name,
            ownerId: contactOwnerId,
            personId: contactPerson.id
        }
        const createdContact: ContactDTO = await this._contactRepo.create(createContactDTO);
        return createdContact;
    }
}