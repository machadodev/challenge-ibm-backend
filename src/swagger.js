const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Challenge IBM Backend',
    description: 'Node app desenvolvido para atender ao desafio da IBM Brasil',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './src/swagger_output.json';
const endpointsFiles = ['./src/router/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
