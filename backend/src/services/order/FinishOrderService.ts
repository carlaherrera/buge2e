import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: string;
}

class FinishOrderService {
  async execute({ order_id }: OrderRequest) {
    try {
      const order = await prismaClient.order.update({
        where: {
          id: order_id,
        },
        data: {
          status: true,
        },
      });

      return order;
    } catch (error) {
      console.error("Erro ao finalizar o pedido:", error);
      throw new Error("Não foi possível finalizar o pedido.");
    }
  }
}

export { FinishOrderService };
