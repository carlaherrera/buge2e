import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class RemoveOrderService {
    async execute({ order_id }: OrderRequest) {
        try {
            // Verificar se o order_id é uma string não vazia
            if (typeof order_id !== 'string' || order_id.trim() === '') {
                throw new Error('ID do pedido inválido');
            }

            // Tentar excluir o pedido
            const deletedOrder = await prismaClient.order.delete({
                where: {
                    id: order_id,
                },
            });

            if (!deletedOrder) {
                throw new Error('Pedido não encontrado');
            }

            return deletedOrder;
        } catch (error) {
            // Tratamento de erros
            console.error(error);

            if (error instanceof Error) {
                // Verificar o tipo de erro e formate a mensagem de erro apropriadamente
                if (error.message.includes('ID do pedido inválido')) {
                    throw new Error('ID do pedido inválido');
                } else if (error.message.includes('Pedido não encontrado')) {
                    throw new Error('Pedido não encontrado');
                } else {
                    throw new Error('Erro ao remover o pedido');
                }
            } else {
                throw new Error('Erro desconhecido ao remover o pedido');
            }
        }
    }
}

export { RemoveOrderService };
