import prismaClient from "../../prisma";

class ListOrdersService {
    async execute({ page = 1, pageSize = 10 } = {}) {
        try {
            // Calcula o número de itens a pular com base na página atual
            const skip = (page - 1) * pageSize;

            // Busca os pedidos no banco de dados
            const orders = await prismaClient.order.findMany({
                where: {
                    draft: false,
                    status: false,
                },
                orderBy: {
                    created_at: 'desc',
                },
                skip: skip,
                take: pageSize,
            });

            // Calcula o total de pedidos para fins de paginação
            const totalOrders = await prismaClient.order.count({
                where: {
                    draft: false,
                    status: false,
                }
            });

            // Retorna os pedidos junto com informações de paginação
            return {
                data: orders,
                total: totalOrders,
                page: page,
                pageSize: pageSize,
                totalPages: Math.ceil(totalOrders / pageSize)
            };
        } catch (error) {
            console.error("Erro ao listar os pedidos:", error);
            throw new Error("Não foi possível listar os pedidos.");
        }
    }
}

export { ListOrdersService };
