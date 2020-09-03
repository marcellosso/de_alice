const Project = require('../models/Project');
const Task = require('../models/Task');

module.exports = {
    async index (req, res)  {
        try {
            const projects = await Project.find().populate(['user', 'tasks']);

            return res.send({ projects })

        } catch (e) {
            return res.status(400).send({ error: 'Erro ao listar projetos' })
        }
        
    },

    async show (req, res) {
        try {
            const project = await Project.findById(req.params.projectId).populate(['user', 'tasks']);

            return res.send({ project })

        } catch (e) {
            return res.status(400).send({ error: 'Erro ao listar projeto' })
        }
    },

    async create (req, res) {
        try {
            const { title, description, tasks } = req.body;

            const project = await Project.create({ title, description, user: req.userId });

            await Promise.all(tasks.map(async task => {
               const projectTask = new Task({ ...task, project: project._id });

               await projectTask.save();

               project.tasks.push(projectTask);
            }));

            await project.save();
            
            return res.send({ project });
        } catch (e) {
            return res.status(400).send({ error: 'Erro ao criar novo projeto' });
        }
    },

    async update (req, res) {
        try {
            const { title, description, tasks } = req.body;

            const project = await Project.findByIdAndUpdate(req.params.projectId, { 
                title, 
                description
            }, { new: true });

            project.tasks = [];
            await Task.remove({ project: project._id });

            await Promise.all(tasks.map(async task => {
               const projectTask = new Task({ ...task, project: project._id });

               await projectTask.save();

               project.tasks.push(projectTask);
            }));

            await project.save();
            
            return res.send({ project });
        } catch (e) {
            return res.status(400).send({ error: 'Erro ao atualizar o projeto' });
        }
    },

    async delete (req, res) {
        try {
            await Project.findByIdAndRemove(req.params.projectId);

            return res.send();

        } catch (e) {
            return res.status(400).send({ error: 'Erro ao deletar projeto' })
        }
    },
}