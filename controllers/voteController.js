const Vote = require('../models/Vote');
const Idea = require('../models/Idea');

class VoteController {
  static async vote(req, res) {
    try {
      const { idea_id } = req.body;
      const customer_id = req.customer.id;

      if (!idea_id) {
        return res.status(400).json({ error: 'ID da ideia é obrigatório.' });
      }

      // Verificar se a ideia existe
      const idea = await Idea.findById(idea_id);
      if (!idea) {
        return res.status(404).json({ error: 'Ideia não encontrada.' });
      }

      // Verificar se o usuário já votou nesta ideia
      const alreadyVoted = await Vote.exists({ customer_id, idea_id });
      if (alreadyVoted) {
        return res.status(400).json({ error: 'Você já votou nesta ideia.' });
      }

      // Criar o voto
      const vote = await Vote.create({ customer_id, idea_id });

      // Buscar a contagem atualizada de votos
      const voteCount = await Vote.countByIdeaId(idea_id);

      res.json({
        message: 'Voto registrado com sucesso!',
        vote,
        voteCount
      });
    } catch (error) {
      console.error('Erro ao votar:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  static async removeVote(req, res) {
    try {
      const { idea_id } = req.body;
      const customer_id = req.customer.id;

      if (!idea_id) {
        return res.status(400).json({ error: 'ID da ideia é obrigatório.' });
      }

      // Verificar se o voto existe
      const voteExists = await Vote.exists({ customer_id, idea_id });
      if (!voteExists) {
        return res.status(404).json({ error: 'Voto não encontrado.' });
      }

      // Remover o voto
      await Vote.delete({ customer_id, idea_id });

      // Buscar a contagem atualizada de votos
      const voteCount = await Vote.countByIdeaId(idea_id);

      res.json({
        message: 'Voto removido com sucesso!',
        voteCount
      });
    } catch (error) {
      console.error('Erro ao remover voto:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  static async checkVote(req, res) {
    try {
      const { idea_id } = req.params;
      const customer_id = req.customer.id;

      const hasVoted = await Vote.exists({ customer_id, idea_id });
      
      res.json({ hasVoted });
    } catch (error) {
      console.error('Erro ao verificar voto:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

module.exports = VoteController;