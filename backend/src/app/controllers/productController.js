const Category = require('../models/Category');
const Product = require('../models/Product');

module.exports = {

    async create(req, res) {
        try {
            const { title, description, value, products } = req.body;

            const category = await Category.create({ title, description, value });

            await Promise.all(products.map(async product => {
                const productCat = new Product({ ...product, category: category._id, value });

                await productCat.save();

                category.products.push(productCat);
            }));

            await category.save();

            return res.send({ category });
        } catch (e) {
            return res.status(400).send({ error: 'Erro ao criar categoria' });
        }
    },

    async indexOne (req, res) {
        try {
            const category = await Category.findById(req.params.categoryId).populate('products');

            return res.send({ category })

        } catch (e) {
            return res.status(400).send({ error: 'Erro ao listar categoria' })
        }
    },

    async index (req, res)  {
        try {
            const categories = await Category.find().populate('products');

            return res.send({ categories })

        } catch (e) {
            return res.status(400).send({ error: 'Erro ao listar categorias' })
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
               const categoryProduct = new Product({ ...product, category: category._id, value });

               await categoryProduct.save();

               category.products.push(categoryProduct);
            }));

            await category.save();
            
            return res.send({ category });
        } catch (e) {
            return res.status(400).send({ error: 'Erro ao atualizar a categorria' });
        }
    },

    async delete (req, res) {
        try {
            await Category.findByIdAndRemove(req.params.categoryId);

            return res.send();

        } catch (e) {
            return res.status(400).send({ error: 'Erro ao deletar categoria' })
        }
    },

    async deleteProd (req, res) {
        try {

            const category = await Category.findById(req.params.categoryId);
            const product = await Product.findByIdAndRemove(req.params.productId);

            category.products.remove(product);
            await category.save();
            
            return res.send();

        } catch (e) {
            return res.status(400).send({ error: 'Erro ao deletar produto' })
        }
    },

}