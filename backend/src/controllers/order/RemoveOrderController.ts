import { Request, Response } from 'express';
import { RemoveOrderService } from '../../services/order/RemoveOrderService';

class RemoveOrderController {
    async handle(req: Request, res: Response) {
        const order_id = req.query.order_id as string;

        // Validação de entrada
        if (!order_id) {
            return res.status(400).json({ error: "ID do pedido é necessário." });
        }

        const removeOrderService = new RemoveOrderService();

        try {
            const order = await removeOrderService.execute({ order_id });
            return res.json(order);
        } catch (error) {
            console.error("Erro ao remover o pedido:", error);
            
            // Pode-se personalizar o código de status baseado no tipo de erro
            if (error.message === 'Pedido não encontrado') {
                return res.status(404).json({ error: error.message });
            }
            if (error.message === 'ID do pedido inválido') {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }
}

export { RemoveOrderController };
