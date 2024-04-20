import { Request, Response, NextFunction } from "express";

import AppError from "../../utils/AppError";
import IRepository from "../../interfaces/IRepository";

export default class CrudController {
    constructor(
        private readonly _entityName: string,
        private readonly _repo: IRepository
    ) {}

    public async createOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log(req.body);
            const createdEntity: Object = await this._repo.create(req.body);
            res.status(200).json({
                "status": "success",
                "message": `${this._entityName} Created Successfully`,
                "data": createdEntity
            })
        } 
        catch (err) { return next(err) };
    }

    public async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const entity: Object | null = await this._repo.getById(req.params.id);
            if (entity === null) throw new AppError(`${this._entityName} not found with this Id`, 404);
            res.status(200).json({
                "status": "success",
                "message": `${this._entityName} Fetched Successfully.`,
                "data": entity
            });
        } 
        catch (err) { return next(err) };
    } 

    public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const entities: Object[] = await this._repo.getAll();
            res.status(200).json({
                "status": "success",
                "message": `${this._entityName}s Fetched Successfully.`,
                "data": entities
            });
        } 
        catch (err) { return next(err) }
    }


    public async updateOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const updatedEntity: Object = await this._repo.updateById(req.params.id, req.body);
            res.status(200).json({
                "status": "success",
                "message": `${this._entityName} Updated Successfully`,
                "data": updatedEntity
            })
        }
        catch (err) { return next(err) };
    }


    public async deleteOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const deletedEntity: Object | null = await this._repo.deleteById(req.params.id);
            res.status(200).json({
                "status": "success",
                "message": `${this._entityName} Deleted Successfully.`,
                "data": deletedEntity
            });
        } 
        catch (err) { return next(err) };
    }
}