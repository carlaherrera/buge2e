import { Request, Response } from "express";
import {  RemoveUserService } from '../../services/user/RemoveUserService';

class RemoveUserController{
    async handle(req: Request, res: Response){
        const user_id = req.query.id as string;

        const removeUserService = new RemoveUserService();

        const user = await removeUserService.execute({
            user_id
        })

        return res.json(user);

    }
}

export { RemoveUserController }




