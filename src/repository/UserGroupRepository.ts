
import { UserGroup } from "@prisma/client";
import prisma from "../prisma-client";
import { CreateUserGroupDTO, CreateUserGroupSchema, UpdateUserGroupSchema } from "../zod/user-group.schema";
import { v4 as uuid } from "uuid";
import IRepository from "../interfaces/IRepository";



export default class UserGroupRepository implements IRepository {
    
    public async getById(id: string): Promise<UserGroup | null> {
        const userGroup: UserGroup | null = await prisma.userGroup.findUnique({ where: { id: id }});
        return userGroup;
    }

    public async getAll(): Promise<UserGroup[]> {
        const userGroups: UserGroup[] = await prisma.userGroup.findMany();
        return userGroups;
    }

    public async create(userGroupDTO: CreateUserGroupDTO): Promise<UserGroup> {
        userGroupDTO = CreateUserGroupSchema.parse(userGroupDTO);
        const userGroup: UserGroup = await prisma.userGroup.create({
            data: {
                ...userGroupDTO,
                id: uuid(),
                createdAt: new Date(),
                updatedAt: null,
                isDeleted: false,
                deletedAt: null
            }
        });
        return userGroup;
    }

    public async deleteById(id: string): Promise<UserGroup | null> {
        const userGroup: UserGroup | null = await prisma.userGroup.delete({ where: { id: id }});
        return userGroup;
    }

    public async updateById(id: string, userGroupDTO: Partial<UserGroup>): Promise<UserGroup> {
        userGroupDTO = UpdateUserGroupSchema.parse(userGroupDTO);
        userGroupDTO.updatedAt = new Date();
        const userGroup: UserGroup = await prisma.userGroup.update({
            where: { id: id },
            data: userGroupDTO
        });
        return userGroup;
    }
}