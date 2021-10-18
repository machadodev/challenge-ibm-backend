const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../docs/swagger_output.json');
const {
  AuthController,
  HealthController,
  SearchErrorsController,
} = require('../app/controllers');
const {
  AddRedirectMiddleware,
  AuthCheckMiddleware,
} = require('../app/middlewares');

module.exports = function (app) {
  // short hand way to protect a series of different API end points
  app.use('/api/*', AuthCheckMiddleware);

  // web interface for swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

  app.get('/', (req, res) => {
    // #swagger.summary = "Ping"
    // #swagger.description = "Verifica se a aplicação está ONLINE"
    return HealthController.getHealth(req, res);
  });
  app.get('/auth/login', AddRedirectMiddleware, (req, res) => {
    // #swagger.summary = "Entrar"
    // #swagger.description = "Força o login com AppID"

    AuthController.login()(req, res);
  });
  app.get('/auth/logout', (req, res) => {
    // #swagger.summary = "Sair"
    // #swagger.description = "Faz logout da aplicação"

    return AuthController.logout(req, res);
  });
  app.get('/auth/logged', (req, res) => {
    // #swagger.summary = "Verifica se o usuário está logado"
    // #swagger.description = "Verifica se o usuário está logado e devolve um booleano, nome e mail caso esteja conectado"

    return AuthController.userAuth(req, res);
  });
  app.get('/ibm/cloud/appid/callback', (req, res) => {
    // #swagger.summary = "Callback Login"
    // #swagger.description = "Função de retorno quando o usuário se conecta"

    AuthController.cbAuthorization()(req, res);
  });

  app.post('/api/search', (req, res) => {
    // #swagger.summary = "Busca erros no Stack Overflow"
    // #swagger.description = "Faz uma busca no Stack Overflow sobre determinado assunto e tenta dar uma solução."
    /*	#swagger.parameters['text'] = {
            in: 'body',
            description: 'Elemento que será buscado.',
            required: true,
            type: 'string',} 
            #swagger.parameters['pagesize'] = {
            in: 'body',
            description: 'Quantos elementos serão devolvidos no máximo.',
            required: false,
            type: 'string',} 
            #swagger.parameters['sort'] = {
            in: 'body',
            description: 'Que tipo de ordenação será utilizada para trazer os resultados',
            required: false,
            type: 'string',} 
            #swagger.parameters['order'] = {
            in: 'body',
            description: 'Se será ascendente ou decrescente',
            required: false,
            type: 'string',} 
            #swagger.parameters['accepted'] = {
            in: 'body',
            description: 'True ou False para retornar somente respostas marcadas como aceitas',
            required: false,
            type: 'string',} 
    
    */
    return SearchErrorsController.search(req, res);
  });
};
