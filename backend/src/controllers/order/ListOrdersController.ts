import { Request, Response } from 'express';
import { ListOrdersService } from '../../services/order/ListOrdersService';

class ListOrdersController {
    async handle(req: Request, res: Response) {
        // Extrai page e pageSize da query string e converte para número
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;

        const listOrdersService = new ListOrdersService();

        try {
            const orders = await listOrdersService.execute({ page, pageSize });
            return res.json(orders);
        } catch (error) {
            // Tratamento de erro apropriado
            return res.status(500).json({ error: error.message });
        }
    }
}

export { ListOrdersController };
