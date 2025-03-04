import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController{
    private userService: UserService

    constructor(){
        this.userService = new UserService();
    }

    async create(req: Request, res: Response){
        try{
            const {name, email, password} = req.body

            const user =  await this.userService.create({name, email, password})

            return res.status(200).json(user)
        }catch(err:any){
            return res.status(400).json({Error:err.message})
        }
    }
}

export {UserController}