import prisma from "../prisma";

interface ProductRequest{
    name:string,
    price:string,
    description:string,
    banner:string,
    categoryId:string
}

class ProductService{
    async create({name, price, description, banner, categoryId}:ProductRequest){


        if(!name || !price || !description || !banner || !categoryId){
            throw new Error("Informe todas os dados necessários para criar um produto.")
        }

        const produto = await prisma.product.create({
            data:{
                name:name,
                price:price,
                description:description,
                category_id:categoryId,
                banner:banner
            }
        })
    }
}

export {ProductService}