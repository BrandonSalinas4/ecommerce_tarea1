import orders from "../models/order";

// Controlador para obtener las ordenes por ID
export const GetOrderById = async (req, res) => {
    const orders = await orders.findOne({
        where:{ id: +req.params.id },    
    });

    res.json(orders);
};

// Controlador para crear una orden
export const CreateOrder = async (req, res) => {
    const orderToCreate = req.body;

    await orders.create(orderToCreate);

    res.status(201).json(orderToCreate);
};

// Controlador para actualizar una orden
export const UpdateOrderById = async (req, res) => {
    await orders.update(req.body, {
        where: {
            id: req.params.id,
        },
    });

    const orderUpdated = await orders.findOne({
        where: {
            id: +req.params.id,
        },
    });

    res.json(orderUpdated);
};

// Controlador para eliminar una orden por ID
export const DeleteOrderById = async (req, res) => {
    const orderToDelete = await orders.findOne({
        where: {
            id: +req.params.id,
        },
    });

    await orders.destroy({
        where: {
            id: +req.params.id,
        },
    });

    res.json(orderToDelete);
};