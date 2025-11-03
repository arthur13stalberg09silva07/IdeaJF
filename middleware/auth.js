const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'seu_segredo_jwt');
    const customer = await Customer.findById(decoded.id);
    
    if (!customer) {
      return res.status(401).json({ error: 'Token inválido. Usuário não encontrado.' });
    }

    req.customer = customer;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido.' });
  }
};

const generateToken = (customerId) => {
  return jwt.sign({ id: customerId }, process.env.JWT_SECRET || 'seu_segredo_jwt', {
    expiresIn: '7d'
  });
};

module.exports = { isLoggedIn, generateToken };