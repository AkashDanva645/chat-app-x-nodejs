import { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";
import { CreateUserDTO, UserDTO, UpdateUserDTO, UserSignUpDTO, SignedUpUserDTO, UserCredsDTO } from "../zod/user.schema";


export default class UserController {

    constructor (
        private readonly _userService: UserService
    ) {}

    public async createOneUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const createUserDTO: CreateUserDTO = req.body;
            const createdUser: UserDTO = await this._userService.createUserPersitence(createUserDTO);
            res.status(200).json({
                "status": "success",
                "message": "User Created Successfully",
                "data": createdUser
            })
        } 
        catch (err) { return next(err) };
    }
    
    public async getOneUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: string = req.params.id;
            const user: UserDTO = await this._userService.getOne(id);
            res.status(200).json({
                "status": "success",
                "message": "User Fetched Successfully.",
                "data": user
            });
        } 
        catch (err) { return next(err) };
    } 

    public async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users: UserDTO[] = await this._userService.getAll();
            res.status(200).json({
                "status": "success",
                "message": "User Fetched Successfully.",
                "data": users
            });
        } 
        catch (err) { return next(err) }
    }

    public async updateOneUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const updateUserDTO: UpdateUserDTO = req.body;
            const userId: string = req.params.id;
            const updatedUser: UserDTO = await this._userService.updateOne(userId, updateUserDTO);
            res.status(200).json({
                "status": "success",
                "message": "User Updated Successfully",
                "data": updatedUser
            })
        }
        catch (err) { return next(err) };
    }

    public async deleteOneUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const user: UserDTO = await this._userService.deleteOne(id);
            res.status(200).json({
                "status": "success",
                "message": "User Deleted Successfully.",
                "data": user
            });
        } 
        catch (err) { return next(err) };
    }

    public async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user: SignedUpUserDTO = await this._userService.signUp(req.body);
            res.status(200).json({
                "status": "success",
                "message": "User Signed Up Successfully.",
                "data": user
            });
        } 
        catch (err) { return next(err) };
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {

    }
}