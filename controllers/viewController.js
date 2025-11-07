const Idea = require("../models/Idea");
const Vote = require("../models/Vote");

class ViewController {
  // Rotas de Autenticação
  static login(req, res) {
    res.render("auth/login");
  }

  static register(req, res) {
    res.render("auth/register");
  }

  static profile(req, res) {
    // Esta rota deve ser protegida por um middleware que injeta o customer no req
    // No entanto, como o frontend está usando JWT, a tela de perfil é carregada via JS
    // Apenas renderizamos o template, e o JS faz o resto.
    res.render("auth/profile");
  }

  // Rotas de Ideias
  static async home(req, res) {
    // A listagem de ideias é feita via AJAX no frontend, mas o template é renderizado aqui
    res.render("home");
  }

  static createIdea(req, res) {
    res.render("ideas/create");
  }

  static async editIdea(req, res) {
    try {
      const ideaId = req.params.id;
      const idea = await Idea.findById(ideaId);

      if (!idea) {
        return res
          .status(404)
          .render("404", { message: "Ideia não encontrada." });
      }

      // Simulação de verificação de autor (o middleware isAuthor faria isso na API)
      // Para a view, apenas passamos os dados
      res.render("ideas/edit", { idea });
    } catch (error) {
      console.error("Erro ao carregar ideia para edição:", error);
      res.status(500).render("500", { message: "Erro interno do servidor." });
    }
  }

  static async viewIdea(req, res) {
    try {
      const ideaId = req.params.id;
      const idea = await Idea.findById(ideaId);

      if (!idea) {
        return res
          .status(404)
          .render("404", { message: "Ideia não encontrada." });
      }

      // Para a view de detalhes, precisamos de mais dados se o usuário estiver logado
      let hasVoted = false;
      let isAuthor = false;

      // Se o usuário estiver logado (populado pelo middleware redirectIfNotLoggedIn)
      if (req.customer) {
        hasVoted = await Vote.exists({
          customer_id: req.customer.id,
          idea_id: ideaId,
        });
        isAuthor = idea.customer_id === req.customer.id;
      }

      res.render("ideas/details", {
        idea: {
          ...idea,
          hasVoted,
          isAuthor,
        },
        customer: req.customer, // Passa o customer para o layout
      });
    } catch (error) {
      console.error("Erro ao carregar ideia:", error);
      res.status(500).render("500", { message: "Erro interno do servidor." });
    }
  }
}

module.exports = ViewController;
