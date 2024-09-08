import products from "../models/product";

// Controlador para obtener los productos por ID
export const GetProductById = async (req, res) => {
    const products = await products.findOne({
        where:{ id: +req.params.id },    
    });

    res.json(products);
};

// Controlador para crear un producto
export const CreateNewProduct = async (req, res) => {
    const productToCreate = req.body;

    await products.create(productToCreate);

    res.status(201).json(productToCreate);
};

// Controlador para actualizar un producto
export const UpdateProductById = async (req, res) => {
    await products.update(req.body, {
        where: {
            id: req.params.id,
        },
    });

    const productUpdated = await products.findOne({
        where: {
            id: +req.params.id,
        },
    });

    res.json(productUpdated);
};

// Controlador para eliminar un producto por ID
export const DeleteProductById = async (req, res) => {
    const productToDelete = await products.findOne({
        where: {
            id: +req.params.id,
        },
    });

    await products.destroy({
        where: {
            id: +req.params.id,
        },
    });

    res.json(productToDelete);
};
