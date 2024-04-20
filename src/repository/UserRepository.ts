
import { User } from "@prisma/client";
import prisma from "../prisma-client";
import { CreateUserDTO, CreateUserSchema, UpdateUserSchema } from "../zod/user.schema";
import { v4 as uuid } from "uuid";
import IRepository from "../interfaces/IRepository";



export default class UserRepository implements IRepository {
    
    public async getById(id: string): Promise<User | null> {
        const user: User | null = await prisma.user.findUnique({ where: { id: id }});
        return user;
    }


    public async getAll(): Promise<User[]> {
        const users: User[] = await prisma.user.findMany();
        return users;
    }


    public async create(userDTO: CreateUserDTO): Promise<User> {
        userDTO = CreateUserSchema.parse(userDTO);
        const user: User = await prisma.user.create({
            data: {
                ...userDTO,
                id: uuid(),
                createdAt: new Date(),
                updatedAt: null,
                isDeleted: false,
                deletedAt: null
            }
        });
        return user;
    }


    public async deleteById(id: string): Promise<User | null> {
        const user: User | null = await prisma.user.delete({ where: { id: id }});
        return user;
    }


    public async updateById(id: string, userDTO: Partial<User>): Promise<User> {
        userDTO = UpdateUserSchema.parse(userDTO);
        userDTO.updatedAt = new Date();
        const user: User = await prisma.user.update({
            where: { id: id },
            data: userDTO
        });
        return user;
    }


    public async findByUsernameOrEmail(username: string, email: string): Promise<User[]> {
        const users: User[] = await prisma.user.findMany({
            where: {
                OR: [
                    { email: { equals: email } },
                    { username: { equals: username } }
                ]
            }
        });
        return users;
    }


    public async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
        const user: User | null = await prisma.user.findUnique({
            where: { phoneNumber: phoneNumber }
        });
        return user;
    }
}