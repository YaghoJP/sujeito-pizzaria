import { hash } from "bcryptjs";
import prisma from "../prisma";

interface UserCreateRequest{
    name: string,
    email: string,
    password: string
}

class UserService{
    async create({name, email, password}: UserCreateRequest){
        
        if(!name){
            throw new Error("Nome do usuário é obrigatório.")
        }
        if(!email){
            throw new Error("Email do usuário é obrigatório.")
        }
        if(!password){
            throw new Error("Senha do usuário é obrigatório.")
        }

        //Validando se já não existe esse usuário no banco.
        const userAlreadyExist = await prisma.user.findFirst({
            where:{
                email:email
            }
        })

        if(userAlreadyExist){
            throw new Error("Usurário já existe.")
        }

        const passwordHash = await hash(password, 8)

        //Falta a parte de criptografar a senha.

        //Criando o usuário de fato.
        const newUser = await prisma.user.create({
            data:{
                email:email,
                name:name,
                password:passwordHash
            },
            select:{
                id:true,
                name:true,
                email:true
            }
        })

        return newUser
    }

}

export {UserService}