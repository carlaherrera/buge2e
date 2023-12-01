import prismaClient from "../../prisma";
import { hash } from 'bcryptjs'

interface UserRequest {
    name: string;
    email: string;
    password: string
}


class CreateUserService {
    async execute({ name, email, password }: UserRequest) {

        //verifica se email enviado
        if (!email) {
            throw new Error('Email incorreto')
        }

        //formato de e-mail incorreto sem @
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Formato de e-mail incorreto');
        }

        // Verificar a senha com os critérios especificados
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
        if (!passwordRegex.test(password)) {
            throw new Error('A senha deve conter entre 8 e 12 caracteres, pelo menos uma letra maiúscula, um número, uma letra minúscula e um caractere especial.');
        }


        //Verificar se esse e-mail já está cadastrado na plataforma
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error('E-mail já cadastrado!')
        }

        //criptografar a senha 
        const passwordHash = await hash(password, 8)

        //cadastrar o usuário
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash, //a senha criptografada vai ser salva no bd
            },

            select: {
                id: true,
                name: true,
                email: true

            }
        })

        return user;
    }
}

export { CreateUserService }