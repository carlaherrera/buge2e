import { Request, Response} from 'express';
import { AuthUserService } from '../../services/user/AuthService';

class AuthUserController {
    async handle(req: Request, res: Response){
        const { email, password } = req.body;

        // Validação de entrada
        if (!email || !password) {
            return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
        }

        const authUserService = new AuthUserService();

        try {
            const auth = await authUserService.execute({
                email,
                password
            });

            return res.json(auth);
        } catch (error) {
            console.error("Erro na autenticação:", error);

            // Personalização do código de status baseado no tipo de erro
            if (error.message === 'Usuário e/ou Senha incorretos.') {
                return res.status(401).json({ error: error.message });
            } else if (error.message === 'Erro ao gerar token.') {
                return res.status(500).json({ error: error.message });
            }

            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }
}

export { AuthUserController };
