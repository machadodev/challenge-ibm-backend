# Stack Overflow Searcher - Backend

[![forthebadge made-with-python](https://forthebadge.com/images/badges/works-on-my-machine.svg)](#)

Node app desenvolvido para atender ao desafio da IBM Brasil.

## Stack

- [x] [NodeJS](https://nodejs.org/en/) - ^v16.11.1
- [x] [Yarn](https://www.npmjs.com/package/yarn) - ^1.22.10
- [x] [Express](https://expressjs.com/pt-br/)
- [x] [IBM Cloud Foundry](https://www.ibm.com/br-pt/cloud/cloud-foundry)
- [x] [IBM Cloud AppID](https://www.ibm.com/br-pt/cloud/app-id)
- [x] [Swagger](https://swagger.io/)

## App

Este app foi desenvolvido como avaliação da IBM Brasil. Ele está integrado com a IBM cloud. Seu objetivo é receber uma requisição com um texto que reporta um erro e tentar consultar uma solução no Stack Overflow.

### Documentação

A documentação do App foi feita com o [Swagger](https://swagger.io/) e pode ser acessada na rota /api-docs.

### Instalação

É necessário ter o [NodeJS](https://nodejs.org/en/) e o [Yarn](https://www.npmjs.com/package/yarn) instalado.

Após clonar o repositório, é necessário executar o comando:

```sh
$ cd backend
$ cp .env.example .env
```

Dessa forma as variáveis de ambiente ficarão disponíveis. Basta preencher com as informações necessárias.

Também será necessário copiar o arquivo de configuração do AppID:

```sh
$ cd backend/src/app/config
$ cp localdev-config.json.example localdev-config.json
```

Para utilizar o AppID é necessário preencher este arquivo. Acesse sua instância do AppID na IBM Cloud, clique em _Applications_, crie um app caso ainda não exista e copie as credenciais. Acesse a [documentação](https://cloud.ibm.com/docs/appid) do AppID para mais informações.

### Compilação e execução

Para compilar o app (versão utilizada em produção):

```sh
$ cd challenge-ibm-backend
$ yarn build
```

Para rodar o app em desenvolvimento:

```sh
$ cd challenge-ibm-backend
$ yarn dev
```

### Testes

Para rodar os testes basta digitar:

```sh
$ cd challenge-ibm-backend
$ yarn test
```

#### Autor

_Leonardo Machado_
_Rio de Janeiro, Brasil - 2021_
