const Customer = require('../models/Customer');
const { generateToken } = require('../middleware/auth');

class AuthController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
      }

      const existingCustomer = await Customer.findByEmail(email);
      if (existingCustomer) {
        return res.status(400).json({ error: 'Email já cadastrado.' });
      }

      const customer = await Customer.create({ name, email, password });
      const token = generateToken(customer.id);

      res.status(201).json({
        message: 'Usuário criado com sucesso!',
        customer: {
          id: customer.id,
          name: customer.name,
          email: customer.email
        },
        token
      });
    } catch (error) {
      console.error('Erro no registro:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
      }

      const customer = await Customer.findByEmail(email);
      if (!customer) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      const isPasswordValid = await Customer.verifyPassword(password, customer.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      const token = generateToken(customer.id);

      res.json({
        message: 'Login realizado com sucesso!',
        customer: {
          id: customer.id,
          name: customer.name,
          email: customer.email
        },
        token
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  static async getProfile(req, res) {
    try {
      res.json({
        customer: req.customer
      });
    } catch (error) {
      console.error('Erro ao obter perfil:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  static async logout(req, res) {
    try {
      // Com JWT, o logout é feito no frontend removendo o token
      // Se estivesse usando sessões, destruiríamos a sessão aqui
      res.json({ message: 'Logout realizado com sucesso!' });
    } catch (error) {
      console.error('Erro no logout:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

module.exports = AuthController;