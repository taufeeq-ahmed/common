import { Request, Response, NextFunction } from "express"
import NotAuthorizedError from "../errors/not-authorized-error"


const validateAuth = (
    req: Request, res: Response, next: NextFunction
) => {
    if (!req.currentUser) {
        throw new NotAuthorizedError()
    }
    next()
}

export default validateAuth
