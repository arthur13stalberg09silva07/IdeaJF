const Idea = require('../models/Idea');

const isAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customerId = req.customer.id;

    const isAuthor = await Idea.isAuthor(id, customerId);
    
    if (!isAuthor) {
      return res.status(403).json({ 
        error: 'Acesso negado. Você não é o autor desta ideia.' 
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao verificar autorização.' });
  }
};

module.exports = { isAuthor };