// 1. IMPORTAÇÕES
const express = require("express");
const exphbs = require("express-handlebars");
const dotenv = require("dotenv");
const path = require("path");

// Carregar variáveis de ambiente
dotenv.config();

// Importar rotas
const authApiRoutes = require("./routes/authRoutes");
const ideaApiRoutes = require("./routes/ideaRoutes");
const voteApiRoutes = require("./routes/voteRoutes");
const viewRoutes = require("./routes/viewRoutes");
const ideaViewRoutes = require("./routes/ideaViewRoutes");

// Importar conexão com o banco (apenas para inicializar)
require("./db/conn");

// 2. INICIALIZAÇÃO DO EXPRESS
const app = express();
const PORT = process.env.PORT || 3000;

// 3. CONFIGURAÇÃO DE MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para injetar o customer no res.locals para o Handlebars
// O req.customer será populado pelo middleware redirectIfNotLoggedIn nas rotas protegidas.
app.use(async (req, res, next) => {
  res.locals.customer = req.customer || null;
  next();
});

// Configuração do Handlebars
app.engine("handlebars", exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    isLoggedIn: function (customer, options) {
      if (customer && customer.id) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    isAuthor: function (ideaCustomerId, currentCustomerId, options) {
      if (ideaCustomerId === currentCustomerId) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  }
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, 'views'));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// 4. USO DAS ROTAS

// Rotas de API (retornam JSON)
app.use("/api/auth", authApiRoutes);
app.use("/api/ideas", ideaApiRoutes);
app.use("/api/votes", voteApiRoutes);

// Rotas de View (renderizam Handlebars)
app.use("/ideas", ideaViewRoutes);
app.use("/", viewRoutes);

// 5. INICIALIZAÇÃO DO SERVIDOR
app.listen(PORT, () =>
  console.log(`🚀 Servidor rodando com sucesso em http://localhost:${PORT}`)
);
