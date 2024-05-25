import { NextFunction, Request, Response } from "express"
import HttpStatusCodes from "../utils/status-codes";
import CustomError from "../errors/custom-error";


const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send(err.serializeErrors());
    }

    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
        errors: [{ message: JSON.stringify(err) }],
    });
}

export default errorHandler
