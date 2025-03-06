import { Request, Response } from "express";
import { OrderService } from "../services/OrderService";

class OrderController{
    private orderService: OrderService

    constructor(){
        this.orderService = new OrderService();
    }

    async create(req: Request, res:Response){
        try{
          
            const {table, name} = req.body 

            const order = await this.orderService.create({table, name})

            return res.status(200).json(order)
        }catch(err:any){
            return res.status(400).json({Error:err.message})
        }
    }

    async remove(req: Request, res:Response){
        try{
          
            const orderID = req.query.orderID as string

            const order = await this.orderService.remove(orderID)

            return res.status(200).json(order)
        }catch(err:any){
            return res.status(400).json({Error:err.message})
        }
    }
}

export {OrderController}