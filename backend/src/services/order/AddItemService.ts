import prismaClient from "../../prisma";

interface ItemRequest {
    order_id: string;
    product_id: string;
    amount: number;
}

class AddItemService {
    async execute({ order_id, product_id, amount }: ItemRequest) {
        try {
            const order = await prismaClient.item.create({
                data: {
                    order_id: order_id,
                    product_id: product_id,
                    amount: amount,
                },
            });

            return order;
        } catch (error) {
            console.error("Erro ao adicionar item ao pedido:", error);
            throw new Error("Não foi possível adicionar o item ao pedido.");
        }
    }
}

export { AddItemService };
