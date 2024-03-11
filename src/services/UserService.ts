import { CreateUserDTO, UserDTO, UpdateUserDTO, UserSignUpDTO, SignedUpUserDTO, UserCredsDTO, CreateUserSchema, UpdateUserSchema } from "../zod/user.schema";
import { User } from "@prisma/client";
import prisma from "../prisma-client";
import { v4 as uuid} from "uuid";
import UserSchema from "../zod/user.schema";
import AppError from "../utils/AppError";
import bcrypt from "bcrypt";



export default class UserService {

    public async getOne(id: string): Promise<UserDTO> {
        const queryRes: User | null= await prisma.user.findUnique({
            where: {
                id: id
            }
        });
        if (queryRes === null) throw new AppError("User with this Id not found.", 404);
        const user: UserDTO = queryRes;
        return user;
    }


    public async getAll(): Promise<UserDTO[]> {
        const queryRes: User[] = await prisma.user.findMany();
        const users: UserDTO[] = queryRes;
        return users;
    }


    public async createUserPersitence(createUserDTO: CreateUserDTO): Promise<UserDTO> {
        const validDTO: CreateUserDTO = CreateUserSchema.parse(createUserDTO as any);
        const user: User = await prisma.user.create({
            data: {
                ...validDTO,
                id: uuid(),
                createdAt: (new Date()).toISOString(),
                isDeleted: false
            }
        });
        const createdUser: UserDTO = user;
        return createdUser;
    }


    public async deleteOne(id: string): Promise<UserDTO> {
        const queryRes: User = await prisma.user.delete({
            where: {
                id: id
            }
        });
        const deletedUser: UserDTO = queryRes;
        return deletedUser;
    }


    public async updateOne(id: string, updateUserDTO: UpdateUserDTO): Promise<UserDTO> {
        const validDTO: any = UpdateUserSchema.parse(updateUserDTO as any);
        const queryRes: User = await prisma.user.update({
            where: {
                id: id,
            },
            data: validDTO
        });
        const updatedUserDTO: UserDTO = queryRes;
        return updatedUserDTO;
    }


    private async hashPassword(pwd: string): Promise<string> {
        return await bcrypt.hash(pwd, 10);
    }


    public async signUp(signUpData: UserSignUpDTO): Promise<SignedUpUserDTO> {
        if (signUpData.password !== signUpData.passwordConfirm) {
            throw new AppError("Password and Confirmed Password do not match.", 400);
        }
        const hashedPassword: string = await this.hashPassword(signUpData.password);
        signUpData.password = hashedPassword;
        let { passwordConfirm, ...data1 } = signUpData;
        const createUserDTO: CreateUserDTO = {...data1, bio: null, profilePicUrl: null };
        const createdUserDTO: UserDTO = await this.createUserPersitence(createUserDTO);
        let { bio, profilePicUrl, createdAt, updatedAt, deletedAt, isDeleted, password, id, ...userSignedUpDTO } = createdUserDTO;
        return userSignedUpDTO;
    }
}

