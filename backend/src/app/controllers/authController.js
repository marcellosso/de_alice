const User = require('../models/User');
const Address = require('../models/Address');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const authConfig = require('../../config/auth.json');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}


module.exports = {
    async create(req, res) {
        const { email } = req.body;

        try {

            if (await User.findOne({ email })) {
                return res.status(400).send({ error: 'Usuário já cadastrado!' });
            }

            const user = await User.create(req.body);

            user.password = undefined;

            return res.send({
                user,
                token: generateToken({ id: user.id })
            });
        } catch (e) {
            return res.status(400).send({ error: 'Falha ao fazer registro' });
        }
    },

    async index(req, res) {
        const users = await User.find();

        if (!users) {
            return res.status(400).send({ error: 'Nenhum usuário cadastrado' });
        }

        return res.send({ users });
    },

    async update(req, res) {
        const userId = req.userId;

        const newUser = req.body;

        const user = await User.findByIdAndUpdate(userId, newUser);

        res.send({ user });
    },

    async indexOne(req, res) {
        const { id } = req.body;

        const user = await User.findOne({ _id: id });


        if (!user) {
            return res.status(400).send({ error: 'Nenhum usuário encontrado' });
        }

        return res.send({ user });
    },

    async auth(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).send({ error: 'Usuário não encontrado' });
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ error: 'Senha inválida' });
        }

        user.password = undefined;

        res.send({
            user,
            token: generateToken({ id: user.id })
        });
    },

    async getUserAddress(req, res) {
        const userId = req.userId;

        // const address = await Address.findOne({ user: userId });
        // const address = await Address.find({ user: userId });
        const address = await Address.findOne({ user: userId });

        if (!address) {
            res.status(400).send({ error: 'Usuário não possui endereço cadastrado' });
        }

        res.send({ address });
    },

    async forgotPassword(req, res) {
        const { email } = req.body;

        try {

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).send({ error: 'Usuário não encontrado' });
            }

            const token = crypto.randomBytes(20).toString('hex');

            const now = new Date();
            now.setHours(now.getHours() + 1);

            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now,
                }
            });

            mailer.sendMail({
                to: email,
                from: 'marcel.losso@gmail.com',
                template: 'auth/forgot_password',
                context: { token }
            }, (err) => {
                if (err) {
                    return res.status(400).send({ error: 'Não foi possível enviar email de esqueceu sua senha' });
                }

                return res.send();
            })

        } catch (err) {

            res.status(400).send({ error: 'Erro no esqueceu a senha, tente novamente' });
        }
    },

    async resetPassword(req, res) {
        const { email, token, password } = req.body;

        try {
            const user = await User.findOne({ email })
                .select('+passwordResetToken passwordResetExpires');

            if (!user) {
                return res.status(400).send({ error: 'Usuário não encontrado' });
            }

            if(token !== user.passwordResetToken){
                return res.status(400).send({ error: 'Token inválido' });
            }

            const now = new Date();

            if (now > user.passwordResetExpires){
                return res.status(400).send({ error: 'Token expirado, gere um novo'});
            }

            user.password = password;

            await user.save();

            res.send();

        } catch (err) {
            console.log(err);
            res.status(400).send({ error: 'Não foi possível resetar a senha, tente novamente' });
        }
    },
}