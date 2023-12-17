import prismaClient from "../../prisma";


interface Category {
    id: string;
    name: string;
}

class ListCategoryService {
    async execute(): Promise<Category[]> {
        try {
            const categories = await prismaClient.category.findMany({
                select: {
                    id: true,
                    name: true,
                },
            });
            return categories;
        } catch (error) {
            console.error("Erro ao listar categorias: ", error);
            throw error;
        }
    }
}

export { ListCategoryService };
