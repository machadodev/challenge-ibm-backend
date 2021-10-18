# Stack Overflow Searcher - Backend

[![forthebadge made-with-python](https://forthebadge.com/images/badges/works-on-my-machine.svg)](#)

_Leonardo Machado_<br>

Node app desenvolvido para atender ao desafio da IBM Brasil.

## Stack

- [x] [NodeJS](https://nodejs.org/en/) - ^v16.11.1
- [x] [Yarn](https://www.npmjs.com/package/yarn) - ^1.22.10
- [x] [Express](https://expressjs.com/pt-br/)
- [x] [IBM Cloud Foundry](https://www.ibm.com/br-pt/cloud/cloud-foundry)
- [x] [IBM Cloud AppID](https://www.ibm.com/br-pt/cloud/app-id)

## App

Este app foi desenvolvido como avaliação da IBM Brasil. Ele está integrado com a IBM cloud. Seu objetivo é receber uma requisição com um texto que reporta um erro e tentar consultar uma solução no Stack Overflow.

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
$ cd backend
$ yarn build
```

Para rodar o app em desenvolvimento:

```sh
$ cd backend
$ yarn dev
```

### Testes

Para rodar os testes basta digitar:

```sh
$ cd backend
$ yarn test
```
