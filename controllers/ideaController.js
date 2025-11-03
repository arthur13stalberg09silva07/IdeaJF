const Idea = require('../models/Idea');

class IdeaController {
  static async createIdea(req, res) {
    try {
      const { title, description, category } = req.body;
      const customer_id = req.customer.id;

      if (!title || !description) {
        return res.status(400).json({ error: 'Título e descrição são obrigatórios.' });
      }

      const idea = await Idea.create({
        customer_id,
        title,
        description,
        category
      });

      res.status(201).json({
        message: 'Ideia criada com sucesso!',
        idea
      });
    } catch (error) {
      console.error('Erro ao criar ideia:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  static async getAllIdeas(req, res) {
    try {
      const ideas = await Idea.findAllWithVotes();
      res.json({ ideas });
    } catch (error) {
      console.error('Erro ao buscar ideias:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  static async getIdeaById(req, res) {
    try {
      const { id } = req.params;
      const idea = await Idea.findById(id);

      if (!idea) {
        return res.status(404).json({ error: 'Ideia não encontrada.' });
      }

      res.json({ idea });
    } catch (error) {
      console.error('Erro ao buscar ideia:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  static async updateIdea(req, res) {
    try {
      const { id } = req.params;
      const { title, description, category } = req.body;

      if (!title || !description) {
        return res.status(400).json({ error: 'Título e descrição são obrigatórios.' });
      }

      const idea = await Idea.update(id, { title, description, category });

      if (!idea) {
        return res.status(404).json({ error: 'Ideia não encontrada.' });
      }

      res.json({
        message: 'Ideia atualizada com sucesso!',
        idea
      });
    } catch (error) {
      console.error('Erro ao atualizar ideia:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  static async deleteIdea(req, res) {
    try {
      const { id } = req.params;
      const idea = await Idea.delete(id);

      if (!idea) {
        return res.status(404).json({ error: 'Ideia não encontrada.' });
      }

      res.json({ message: 'Ideia excluída com sucesso!' });
    } catch (error) {
      console.error('Erro ao excluir ideia:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  static async getMyIdeas(req, res) {
    try {
      const customer_id = req.customer.id;
      const ideas = await Idea.findByCustomerId(customer_id);
      
      res.json({ ideas });
    } catch (error) {
      console.error('Erro ao buscar minhas ideias:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

module.exports = IdeaController;