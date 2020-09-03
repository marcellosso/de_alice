const Tecido = require('../models/Tecido');
const Categoria = require(`../models/Categoria`);

module.exports = {

    async createCategoria(req, res) {
        try {
            const { name, description, value } = req.body;

            const categoria = await Categoria.create({ name, description, value });

            return res.send({ categoria });
        } catch (e) {
            return res.status(400).send({ error: 'Erro ao criar categoria' });
        }
    },


    async createTecido(req, res) {
        try {
            const { title, categoriasId } = req.body;

            const tecido = await Tecido.create({ title });

            await Promise.all(categoriasId.map(async catId => {
                const categoria = await Categoria.findById(catId);

                tecido.categorias.push(categoria);
            }));

            await tecido.save();

            return res.send({ tecido });
        } catch (e) {
            return res.status(400).send({ error: 'Erro ao criar tecido' });
        }
    },

    async adicionarCategoria(req, res) {
        try {
            const { categoriaId } = req.body;

            const tecido = await Tecido.findById(req.params.tecidoId);
            const categoria = await Categoria.findById(categoriaId);


            tecido.categorias.push(categoria);
            await tecido.save();

            return res.send({ tecido });


        } catch (e) {
            console.log(e);
            return res.status(400).send({ error: 'Erro ao adicionar nova categoria' });
        }
    },

    async removeCategoria(req, res) {
        try {

            const tecido = await Tecido.findById(req.params.tecidoId);
            const categoria = await Categoria.findByIdAndRemove(req.params.categoriaId);

            tecido.categorias.remove(categoria);
            await tecido.save();

            return res.send({ success: 'Categoria deletada com sucesso' });

        } catch (e) {
            return res.status(400).send({ error: 'Erro ao deletar categoria' })
        }
    },


    async removeTecido(req, res) {
        try {
            await Tecido.findByIdAndRemove(req.params.tecidoId);

            return res.send({ success: 'Tecido deletado com sucesso' });

        } catch (e) {
            return res.status(400).send({ error: 'Erro ao deletar tecido' })
        }
    },

    async listarCategorias(req, res) {
        try {
            const categorias = await Categoria.find();

            return res.send({ categorias });

        } catch (e) {
            console.log(e);
            return res.status(400).send({ error: 'Erro ao listar as categorias' });
        }
    },

    async listarUmaCategoria(req, res) {
        try {
            const categoria = await Categoria.findById(req.params.categoriaId);

            return res.send({ categoria });

        } catch (e) {
            console.log(e);
            return res.status(400).send({ error: 'Erro ao listar uma categoria' });
        }
    },

    async listarTecidos(req, res) {
        try {
            const tecidos = await Tecido.find().populate('categorias');

            return res.send({ tecidos });

        } catch (e) {
            console.log(e);
            return res.status(400).send({ error: 'Erro ao listar os tecidos' });
        }
    },

    async listarTecidosDeCategoria(req, res) {
        // try {
        //     const tecidos = await Tecido.find();

        //     const tecidosCat = [];

        //     tecidos.map(tecido => {
        //         for (let i = 0; i < tecido.categorias.length; i++) {
        //             if (req.params.categoriaId == tecido.categorias[i]) {
        //                 tecidosCat.push(tecido);
        //                 break;
        //             }
        //         }
        //     });

        //     return res.send({ tecidosCat });

        // } catch (e) {
        //     console.log(e);
        //     return res.status(400).send({ error: 'Erro ao listar os tecidos de uma categoria' });
        // }
        try {
            const tecidos = await Tecido.find().where('categorias').in(req.params.categoriaId).exec();

            return res.send({ tecidos });
            
        } catch (e) {
            console.log(e);
            return res.status(400).send({ error: 'Erro ao listar os tecidos de uma categoria' });
        }
    },

    async listarUmTecido(req, res) {
        try {
            const tecido = await Tecido.findById(req.params.tecidoId).populate('categorias');

            return res.send({ tecido });
        } catch (e) {
            console.log(e);
            return res.status(400).send({ error: 'Erro ao listar um tecido' });
        }

    },

}