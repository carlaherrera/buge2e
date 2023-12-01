import prismaClient from "../../prisma";

interface RemoveUserRequest {
    user_id: string;
}

class RemoveUserService {
    async execute({ user_id }: RemoveUserRequest) {
        try {
            const user = await prismaClient.user.delete({
                where: {
                    id: user_id,
                },

                select: {
                    id: true,
                    name: true,
                    email: true

                },
                
            });

           
            return user;
        } catch (error) {
            console.error("Erro ao excluir o usuário:", error);
            throw new Error("Não foi possível excluir o usuário.");
        }
    }
}

export { RemoveUserService };

