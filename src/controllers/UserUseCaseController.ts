import { Request, Response, NextFunction } from "express";
import UserUseCases from "../services/UserUseCases";
import { UserDTO } from "../zod/user.schema";
import { UserSignUpDTO, SignedUpUserDTO, UserCredsDTO, LoggedInUserDTO } from "../zod/userUseCases.schema";
import { ContactDTO, CreateContactDTO } from "../zod/contact.schema";
import AppError from "../utils/AppError";
import { create } from "domain";


export default class UserUseCaseController {

    constructor (
        private readonly _userUseCases: UserUseCases
    ) {}


    public async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userSignUpDTO: UserSignUpDTO = req.body;
            const user: SignedUpUserDTO = await this._userUseCases.signup(userSignUpDTO);
            res.status(200).json({
                "status": "success",
                "message": "User Signed Up Successfully.",
                "data": user
            });
        } 
        catch (err) { return next(err) };
    }


    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userCredsDTO: UserCredsDTO = req.body;
            const user: LoggedInUserDTO = await this._userUseCases.login(userCredsDTO);
            res.status(200).json({
                "status": "success",
                "message": "User Signed Up Successfully.",
                "data": user
            });
        }
        catch (err) { return next(err) }
    }


    public async authorize(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader: string | null = req.headers.authorization || null;
            if (!authHeader) throw new AppError("Please provide auth token.", 400);

            const authorizedUser: UserDTO | null = await this._userUseCases.authenticate(authHeader);
            if (!authorizedUser) throw new AppError("Not Authorized", 400);
            res.locals.userId = authorizedUser.id;
            next();
        }
        catch (err) { return next(err) }
    }

    
    public async createContact(req: Request, res: Response, next: NextFunction) {
        try {
            const createContactDTO: CreateContactDTO = {
                "name": req.body.name,
                "ownerId": res.locals.userId,
                "personId": req.body.personId
            }
            const allContacts: ContactDTO[] = await this._userUseCases.createContact(createContactDTO);
        }
    }

    // Search another User -> Need to Implement Search, for now just get all available users

    // Add a Contact

    // Get All Contacts

    // Update a Contact

    // Delete a Contact

    // Edit Profile

    // Message (text) a Contact

    // Create a Group

    // Add Participants in Group

    // Message (text) in a Group

    // Delete a Group

    // Leave a Group
}