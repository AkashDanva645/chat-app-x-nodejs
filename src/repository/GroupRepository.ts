import IRepository from "../interfaces/IRepository";
import { Group } from "@prisma/client";
import prisma from "../prisma-client";
import { v4 as uuid } from "uuid";
import { UpdateGroupDTO, CreateGroupDTO, UpdateGroupSchema, CreateGroupSchema } from "../zod/group.schema";


export default class GroupRepository implements IRepository {

    public async getById(id: string): Promise<Group | null> {
        const group: Group | null = await prisma.group.findUnique({ where: { id: id }});
        return group;
    }

    public async getAll(): Promise<Group[]> {
        const groups: Group[] = await prisma.group.findMany();
        return groups;
    }

    public async create(createGroupDTO: CreateGroupDTO): Promise<Group> {
        createGroupDTO = CreateGroupSchema.parse(createGroupDTO);
        console.log(createGroupDTO);
        const group: Group = await prisma.group.create({
            data: {
                ...createGroupDTO,
                id: uuid(),
                createdAt: new Date(),
                updatedAt: null,
                isDeleted: false,
                deletedAt: null
            }
        });
        return group;
    }

    public async updateById(id: string, updateGroupDTO: UpdateGroupDTO): Promise<Group> {
        updateGroupDTO = UpdateGroupSchema.parse(updateGroupDTO);
        const group: Group = await prisma.group.update({
            data: updateGroupDTO,
            where: { id: id }
        });
        return group;
    }

    public async deleteById(id: string): Promise<Group | null> {
        const group: Group = await prisma.group.delete({ where: { id: id }});
        return group;
    }
}