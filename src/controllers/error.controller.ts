import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";


export const handleCastErrorDB = (error: any, req: Request, res: Response) => {
    res.status(400).json({
        "status": "fail",
        "message": `Invalid Input ${error.path} -> ${error.value}`
    })
}


export const handleDuplicateErrorDB = (error: any, req: Request, res: Response) => {
    res.status(400).json({
        "status": "fail",
        "message": `Duplicate value for ${error.meta.target}`
    });
}


export const handleValidationErrorDB = (error: any, req: Request, res: Response) => {
    res.status(400).json({
        "status": "fail",
        "message": `${error.message}`
    })
}


export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            "status": error.status,
            "message": error.message
        })
    }
    else {
        console.log(error);
        console.log(error.code);
        // if (error.name === 'CastError') 
        // return handleCastErrorDB(error, req, res);

        if (error.name === "PrismaClientKnownRequestError" && (["P2002"].includes(error.code))) {
            handleDuplicateErrorDB(error, req, res);
        };

        // if (error.name === 'ValidationError')
        // return handleValidationErrorDB(error, req, res);
        
        res.status(500).json({
            "status": "fail",
            "message": "Internal Server Error"
        })
    }
}