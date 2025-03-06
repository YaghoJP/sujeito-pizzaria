import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";

class ProductController{
    private productService: ProductService

    constructor(){
        this.productService = new ProductService();
    }

    async create(req: Request, res: Response){
        try{
            const {name, price, description, categoryId} = req.body
        
            if(!req.file){
                throw new Error("Error upload file")
            }
            
            const {originalname, fieldname: banner} = req.file

            const product = await this.productService.create({name, price, description, banner, categoryId})

            return res.status(200).json(product)

        }catch(err:any){
            return res.status(400).json({Error:err.message})
        }
    }
}

export {ProductController}