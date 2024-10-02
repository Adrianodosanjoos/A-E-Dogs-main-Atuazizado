import * as Yup from 'yup';
import Order from '../schemas/Order';
import Category from '../models/Category';
import Product from '../models/Product';


class OrderController {
    async store(request, response) {
       const schema = Yup.object({
        Products: Yup.arrey()
        .required()
        .of(
            Yup.object({
                id: Yup.number().required(),
                quantity: Yup.number().required(),
            }),
        ),
       });

       try {
        schema.validateSync(request.body, {abortEarly: false});
       } catch (err) {
        return response.status(400).json({error: err.errors});
       }

       const { products } = request.body;

       const productsIds = products.map((product) => product.id);

       const findProducts = await Product.findAll ({
             where: {
                
             },
             include: [
                {
                    model: Category,
                    as:'category',
                    attributes:['name'],
                },
             ],
       });

       const formattedProducts = findProducts.map(product => {
        const productIndex = product.findIndex(item => item.id === product.id);

        const newProduct = {
            id: product.id,
            name: product.name,
            Category: product.Category.name,
            price: product.price,
            url: product.url,
            quantity: products[productIndex].quantity
        };

        return newProduct;
       });
       
       const Order = {
        User: {
            id: request.userId,
            name: request.userName,
        },

       products: formattedProducts,

       };

       return response.status(201).json(Order);
         
    }

}

export default new OrderController();