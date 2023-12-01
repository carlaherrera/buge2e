import prismaClient from "../../prisma";

interface OrderRequest {
    table: number;
    name?: string;
}

class CreateOrderService {
    async execute({ table, name }: OrderRequest) {
        try {
            // Verifique se o número da mesa é um número válido e maior que zero
            if (typeof table !== 'number' || isNaN(table) || table <= 0) {
                throw new Error('Número da mesa inválido. Deve ser um número positivo.');
            }

            // Verifique se o nome é uma string válida (opcional)
            if (name && typeof name !== 'string') {
                throw new Error('Nome inválido');
            }

            // Crie o pedido
            const order = await prismaClient.order.create({
                data: {
                    table: table,
                    name: name || null, // Use null se o nome não for fornecido
                },
            });

            return order;
        } catch (error) {
            // Tratamento de erros
            console.error(error);

            if (error instanceof Error) {
                // Verifique o tipo de erro e formate a mensagem de erro apropriadamente
                if (error.message.includes('Número da mesa inválido')) {
                    throw new Error('Número da mesa inválido. Deve ser um número positivo.');
                } else if (error.message.includes('Nome inválido')) {
                    throw new Error('Nome inválido');
                } else {
                    throw new Error('Erro ao criar o pedido');
                }
            } else {
                throw new Error('Erro desconhecido ao criar o pedido');
            }
        }
    }
}

export { CreateOrderService };
