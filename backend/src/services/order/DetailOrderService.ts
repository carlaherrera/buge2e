import prismaClient from "../../prisma";

interface DetailRequest {
    order_id: string;
}

class DetailOrderService {
    async execute({ order_id }: DetailRequest) {
        try {
            const orders = await prismaClient.item.findMany({
                where: {
                    order_id: order_id,
                },
                include:{
                    product:true,
                    order: true,
                }
            });

            return orders;
        } catch (error) {
            console.error("Erro ao obter detalhes do pedido:", error);
            throw new Error("Não foi possível obter os detalhes do pedido.");
        }
    }
}

export { DetailOrderService };
