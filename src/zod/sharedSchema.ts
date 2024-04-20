import { z } from "zod";

export const uuidSchema = z.string().uuid();

export const dateSchema = z.date();

export const urlSchema = z.string().url();