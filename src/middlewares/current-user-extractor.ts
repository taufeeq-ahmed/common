import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface UserPayload {
    id: string,
    emal: string
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

const currentUserExtractor = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && !("jwt" in req.session)) {
        return next()
    }
    try {
        const payload = jwt.verify(req.session?.jwt, process.env.JWT_KEY!) as UserPayload
        req.currentUser = payload
    } catch (err) { }
    next()
}

export default currentUserExtractor