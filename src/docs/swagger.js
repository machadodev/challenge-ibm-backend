const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Challenge IBM Backend',
    description: 'Node app desenvolvido para atender ao desafio da IBM Brasil',
    version: '1.0.0',
    contact: {
      name: 'Leonardo Machado',
      email: 'leonardoms@id.uff.br',
    },
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './src/docs/swagger_output.json';
const endpointsFiles = ['./src/router/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
