import { Request, Response } from 'express';
import { RemoveItemService } from '../../services/order/RemoveItemService';

class RemoveItemController {
    async handle(req: Request, res: Response) {
        const item_id = req.query.item_id as string;

        // Verificação de entrada
        if (!item_id) {
            return res.status(400).json({ error: "ID do item é necessário." });
        }

        const removeItemService = new RemoveItemService();

        try {
            const order = await removeItemService.execute({ item_id });
            return res.json(order);
        } catch (error) {
            console.error("Erro ao remover o item:", error);
            // O código de status pode ser ajustado com base no tipo de erro
            return res.status(500).json({ error: error.message });
        }
    }
}

export { RemoveItemController };
