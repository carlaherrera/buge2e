import prismaClient from "../../prisma";

interface CategoryRequest {
    category_id: string;
}

class RemoveCategoryService {
    async execute({ category_id }: CategoryRequest) {
        try {
            const existingCategory = await prismaClient.category.findUnique({
                where: {
                    id: category_id,
                },
            });

            if (!existingCategory) {
                throw new Error(`Categoria com o ID ${category_id} não encontrada`);
            }

            const removedCategory = await prismaClient.category.delete({
                where: {
                    id: category_id,
                },
            });

            return removedCategory;
        } catch (error) {
            throw new Error(`Erro ao remover categoria: ${error.message}`);
        }
    }
}

export { RemoveCategoryService };


