import prismaClient from "../../prisma";

interface ItemRequest {
    item_id: string;
}

class RemoveItemService {
    async execute({ item_id }: ItemRequest) {
        try {
            const order = await prismaClient.item.delete({
                where: {
                    id: item_id,
                },
            });
            return order;
        } catch (error) {
            console.error("Erro ao remover o item:", error);
            throw new Error("Não foi possível remover o item.");
        }
    }
}

export { RemoveItemService };
