import prismaClient from "../../prisma";

interface ItemRequest {
    order_id: string;
    product_id: string;
    amount: number;
}

class AddItemService {
    async execute({ order_id, product_id, amount }: ItemRequest) {
        try {
            // Verificação da validade do amount
            if (amount <= 0) {
                throw new Error("A quantidade deve ser um número positivo.");
            }

            // Verificação da existência do pedido
            const orderExists = await prismaClient.order.findUnique({
                where: { id: order_id },
            });
            if (!orderExists) {
                throw new Error("Pedido não encontrado.");
            }

            // Verificação da existência do produto
            const productExists = await prismaClient.product.findUnique({
                where: { id: product_id },
            });
            if (!productExists) {
                throw new Error("Produto não encontrado.");
            }

            // Criação do item
            const orderItem = await prismaClient.item.create({
                data: {
                    order_id: order_id,
                    product_id: product_id,
                    amount: amount,
                },
            });

            return orderItem;
        } catch (error) {
            console.error("Erro ao adicionar item ao pedido:", error);
            throw error; // Repassar o erro para ser tratado em uma camada superior
        }
    }
}

export { AddItemService };

