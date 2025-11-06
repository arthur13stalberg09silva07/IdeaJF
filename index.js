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
const viewRoutes = require("./routes/viewRoutes"); // Novas rotas para renderizar views

// Importar conexão com o banco (apenas para inicializar)
require("./db/conn");

// 2. INICIALIZAÇÃO DO EXPRESS
const app = express();
const PORT = process.env.PORT || 3000;

// 3. CONFIGURAÇÃO DE MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
// Esta deve ser a última rota a ser registrada para não interceptar as rotas de API
app.use("/", viewRoutes);

// 5. INICIALIZAÇÃO DO SERVIDOR
app.listen(PORT, () =>
  console.log(`🚀 Servidor rodando com sucesso em http://localhost:${PORT}`)
);
