const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');

const redirectIfNotLoggedIn = async (req, res, next) => {
  // O token é gerenciado pelo frontend JS, mas para rotas de view,
  // precisamos de um mecanismo para verificar se o usuário está logado.
  // Como o JWT é stateless, a maneira mais comum é usar um cookie para o JWT
  // ou confiar no frontend para redirecionar.
  
  // No seu caso, o middleware isLoggedIn está sendo usado, o que é para API.
  // Vamos simular a verificação de login para views.
  
  // Se o frontend não enviar o token, o middleware isLoggedIn falha.
  // Para rotas de view, vamos confiar no frontend para redirecionar,
  // mas vamos garantir que o req.customer seja populado se o token for enviado
  // via um mecanismo como um cookie.
  
  // Como não estamos usando cookies, vamos apenas garantir que o req.customer
  // seja populado para que o ViewController possa usá-lo.
  
  // O erro 401 que você está vendo é porque o middleware isLoggedIn está sendo usado.
  // Vamos criar um middleware que tenta popular req.customer, mas redireciona se falhar.
  
  try {
    // Tenta obter o token de um cookie (se você estivesse usando)
    // Ou de um header (o que não funciona para navegação direta)
    
    // Para simplificar, vamos usar o middleware isLoggedIn para popular req.customer
    // e criar um novo middleware que verifica se req.customer existe.
    
    // Se o middleware isLoggedIn for usado, ele vai retornar 401.
    // A solução mais simples é usar o middleware isLoggedIn e, se ele falhar,
    // o frontend deve redirecionar.
    
    // Vamos remover o middleware isLoggedIn das rotas de view e confiar no frontend JS.
    // O frontend JS já tem a lógica de redirecionamento.
    
    // O erro 401 que você está vendo é porque o middleware isLoggedIn está sendo usado
    // nas rotas de view.
    
    // Vamos criar um middleware que tenta popular req.customer, mas não falha se não houver token.
    
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
    // Se o token for inválido, redireciona para o login
    return res.redirect('/login');
  }
};

module.exports = { redirectIfNotLoggedIn };
