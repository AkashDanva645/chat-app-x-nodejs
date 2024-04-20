import IRepository from "../interfaces/IRepository";
import { Message } from "@prisma/client";
import prisma from "../prisma-client";
import { v4 as uuid } from "uuid";
import { UpdateMessageDTO, CreateMessageDTO, UpdateMessageSchema, CreateMessageSchema } from "../zod/message.schema";


export default class MessageRepository implements IRepository {

    public async getById(id: string): Promise<Message | null> {
        const message: Message | null = await prisma.message.findUnique({ where: { id: id }});
        return message;
    }

    public async getAll(): Promise<Message[]> {
        const messages: Message[] = await prisma.message.findMany();
        return messages;
    }

    public async create(createMessageDTO: CreateMessageDTO): Promise<Message> {
        createMessageDTO = CreateMessageSchema.parse(createMessageDTO);
        console.log(createMessageDTO);
        const message: Message = await prisma.message.create({
            data: {
                ...createMessageDTO,
                id: uuid(),
                createdAt: new Date(),
                updatedAt: null,
                isDeleted: false,
                deletedAt: null
            }
        });
        return message;
    }

    public async updateById(id: string, updateMessageDTO: UpdateMessageDTO): Promise<Message> {
        updateMessageDTO = UpdateMessageSchema.parse(updateMessageDTO);
        const message: Message = await prisma.message.update({
            data: updateMessageDTO,
            where: { id: id }
        });
        return message;
    }

    public async deleteById(id: string): Promise<Message | null> {
        const message: Message = await prisma.message.delete({ where: { id: id }});
        return message;
    }
}