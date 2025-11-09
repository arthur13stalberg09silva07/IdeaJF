const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');

const redirectIfNotLoggedIn = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'seu_segredo_jwt');
      const customer = await Customer.findById(decoded.id);
      
      if (customer) {
        req.customer = customer;
      }
    }
    
    if (!req.customer) {
      return res.redirect('/login');
    }

    next();
  } catch (error) {
    return res.redirect('/login');
  }
};

module.exports = { redirectIfNotLoggedIn };
