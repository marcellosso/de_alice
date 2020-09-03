const Category = require('../models/Category');
const Product = require('../models/Product');
const Order = require('../models/Order');

module.exports = {

    async create(req, res) {
        try {
            const { products } = req.body;
            let valor = 0;

            const order = await Order.create({ userId: req.userId });

            await Promise.all(products.map(async product => {
                const prod  = await Product.findById(product);
                const { value } = await Category.findById(prod.category);

                valor += value;

                order.productsId.push(prod);

            }));

            order.value = valor;
            await order.save();

            return res.send({ order });
        } catch (e) {
            return res.status(400).send({ error: 'Erro ao criar pedido' });
        }
    },

    async indexOne (req, res) {
        try {
            const order = await Order.findById(req.params.orderId).populate(['productsId', 'userId']);

            return res.send({ order })

        } catch (e) {
            return res.status(400).send({ error: 'Erro ao listar pedido' })
        }
    },

    async index (req, res)  {
        try {
            const orders = await Order.find().populate(['productsId', 'userId']);

            return res.send({ orders })

        } catch (e) {
            return res.status(400).send({ error: 'Erro ao listar pedidos' })
        }
        
    },

    async update (req, res) {
        try {
            const { title, description, value, products } = req.body;

            const category = await Category.findByIdAndUpdate(req.params.categoryId, { 
                title, 
                description,
                value
            }, { new: true });

            category.products = [];
            await Product.remove({ category: category._id });

            await Promise.all(products.map(async product => {
               const categoryProduct = new Product({ ...product, category: category._id });

               await categoryProduct.save();

               category.products.push(categoryProduct);
            }));

            await category.save();
            
            return res.send({ category });
        } catch (e) {
            return res.status(400).send({ error: 'Erro ao atualizar o pedido' });
        }
    },

    async delete (req, res) {
        try {
            await Category.findByIdAndRemove(req.params.categoryId);

            return res.send();

        } catch (e) {
            return res.status(400).send({ error: 'Erro ao deletar pedido' })
        }
    },


}