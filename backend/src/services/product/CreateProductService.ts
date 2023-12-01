import prismaClient from "../../prisma";

interface ProductRequest {
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
}

class CreateProductService {
    async execute({ name, price, description, banner, category_id }: ProductRequest) {


        // Validações de entrada
        if (!name ||!price || !description || !category_id) {
            throw new Error('Campos obrigatórios não preenchidos');
        };

        // Verifica se a categoria existe
        const category = await prismaClient.category.findUnique({
            where: {
                id: category_id
            },
        });

        if (!category) {
            throw new Error('Categoria não encontrada');
        }


        const product = await prismaClient.product.create({
            data: {
                name: name,
                price: price,
                description: description,
                banner: banner,
                category_id: category_id
            }

        })

        return product

    }
}

export { CreateProductService }