import prisma from "../prisma";

interface OrderRequest{
    table:number,
    name?:string
}

class OrderService{
    async create({table, name}:OrderRequest){
        if(!table){
            throw new Error("Número da mesa é obrigatório.")
        }

        return(
            await prisma.order.create({
                data:{
                    table:table,
                    name:name
                },
                select:{
                    id:true,
                    table:true,
                    name:true,
                    draft:true,
                    status:true
                }
            })
        )
    }

    async remove(orderID:string){
        return(
            await prisma.order.delete({
                where:{
                    id:orderID
                }
            })
        )
    }
}

export {OrderService}