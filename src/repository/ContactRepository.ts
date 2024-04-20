
import { Contact } from "@prisma/client";
import { CreateContactDTO, CreateContactSchema, UpdateContactSchema } from "../zod/contact.schema";
import prisma from "../prisma-client";
import { v4 as uuid } from "uuid";
import IRepository from "../interfaces/IRepository";


export default class ContactRepository implements IRepository {

    public async getById(id: string): Promise<Contact | null> {
        const contact: Contact | null = await prisma.contact.findUnique({ where: { id: id }});
        return contact;
    }


    public async create(contactDTO: CreateContactDTO): Promise<Contact> {
        contactDTO = CreateContactSchema.parse(contactDTO);
        const contact: Contact = await prisma.contact.create({
            data: {
                ...contactDTO,
                id: uuid(),
                createdAt: new Date(),
                updatedAt: null,
                isDeleted: false,
                deletedAt: null
            }
        });
        return contact;
    }


    public async getAll(): Promise<Contact[]> {
        const contacts: Contact[] = await prisma.contact.findMany();
        return contacts;
    }


    public async updateById(id: string, updateDTO: Partial<Contact>): Promise<Contact> {
        updateDTO = UpdateContactSchema.parse(updateDTO);
        updateDTO.updatedAt = new Date();
        const contact: Contact = await prisma.contact.update({
            where: { id: id },
            data: updateDTO
        });
        return contact;
    }

    
    public async deleteById(id: string): Promise<Contact | null> {
        const contact: Contact = await prisma.contact.delete({ where: { id: id } });
        return contact;
    }
}