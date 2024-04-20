import { date, z } from "zod";
import { uuidSchema, dateSchema } from "./sharedSchema";

const textContentSchema = z.string();

export const MessageSchema = z.object({
    id: uuidSchema,
    textContent: textContentSchema,
    authorId: uuidSchema,
    receiverId: uuidSchema.optional(),
    groupId: uuidSchema.optional(),
    sent: z.boolean(),
    received: z.boolean(),
    read: z.boolean(),
    createdAt: dateSchema,
    udpatedAt: dateSchema,
    isDeleted: z.boolean(),
    deletedAt: dateSchema
});

export type MessageDTO = z.infer<typeof MessageSchema>


export const CreateMessageSchema = MessageSchema.pick({
    textContent: true,
    authorId: true,
    receiverId: true,
    groupId: true
})
.refine(data => {
    if (!data.receiverId && !data.groupId) return false;
    return true;
}, {
    message: 'receiverId and groupId both cannot be null at once.',
    path: ['receiverId', 'groupId']
});


export type CreateMessageDTO = z.infer<typeof CreateMessageSchema>


export const UpdateMessageSchema = MessageSchema.pick({
    textContent: true,
    sent: true,
    received: true,
    read: true
}).partial();

export type UpdateMessageDTO = z.infer<typeof UpdateMessageSchema>


