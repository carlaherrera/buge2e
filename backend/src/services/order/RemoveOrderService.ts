import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class RemoveOrderService {
    async execute({ order_id }: OrderRequest) {
        if (typeof order_id !== 'string' || order_id.trim() === '') {
            throw new Error('ID do pedido inválido');
        }

        try {
            const deletedOrder = await prismaClient.order.delete({
                where: { id: order_id },
            });

            return deletedOrder;
        } catch (error) {
            console.error("Erro ao remover o pedido:", error);

            if (error.code === "P2025") {
                // Erro específico do Prisma para "Registro não encontrado"
                throw new Error('Pedido não encontrado');
            }
            throw new Error('Erro ao remover o pedido');
        }
    }
}

export { RemoveOrderService };

