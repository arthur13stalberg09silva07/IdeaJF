const Idea = require('../models/Idea');
const Vote = require('../models/Vote');

class ViewController {
  static login(req, res) {
    res.render('auth/login');
  }

  static register(req, res) {
    res.render('auth/register');
  }

  static profile(req, res) {
   
    res.render('auth/profile');
  }

  static async home(req, res) {
   
    res.render('home');
  }

  static createIdea(req, res) {
    res.render('ideas/create');
  }

  static async editIdea(req, res) {
    try {
      const ideaId = req.params.id;
      const idea = await Idea.findById(ideaId);

      if (!idea) {
        return res.status(404).render('404', { message: 'Ideia não encontrada.' });
      }
      
      res.render('ideas/edit', { idea });
    } catch (error) {
      console.error('Erro ao carregar ideia para edição:', error);
      res.status(500).render('500', { message: 'Erro interno do servidor.' });
    }
  }

  static async viewIdea(req, res) {
    try {
      const ideaId = req.params.id;
      const idea = await Idea.findById(ideaId);

      if (!idea) {
        return res.status(404).render('404', { message: 'Ideia não encontrada.' });
      }
      
      let hasVoted = false;
      let isAuthor = false;
      
      if (req.customer) {
        hasVoted = await Vote.exists({ customer_id: req.customer.id, idea_id: ideaId });
        isAuthor = idea.customer_id === req.customer.id;
      }

      res.render('ideas/details', { 
        idea: {
          ...idea,
          hasVoted,
          isAuthor
        }
      });
    } catch (error) {
      console.error('Erro ao carregar ideia:', error);
      res.status(500).render('500', { message: 'Erro interno do servidor.' });
    }
  }
}

module.exports = ViewController;
