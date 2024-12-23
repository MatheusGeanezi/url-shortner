# Encurtador de Links

Este projeto é um encurtador de links simples desenvolvido com **Node.js**, **TypeScript** e **MySQL**. Ele permite que os usuários forneçam URLs longas e obtenham URLs encurtadas que redirecionam para o link original.

## Tecnologias Utilizadas

- **Node.js** (v16 ou superior)
- **TypeScript**
- **MySQL** (configurado via Docker)
- **Docker** (para containers)
- **Express** (para o servidor HTTP)
- **JWT** (para autenticação)

## Pré-requisitos

Antes de rodar o projeto, certifique-se de que as seguintes ferramentas estejam instaladas:

- [Docker](https://www.docker.com/get-started) (para containers)
- [Node.js](https://nodejs.org/en/download/) (v16 ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)
- [MySQL](https://www.mysql.com/) (será configurado via Docker)

## Passos para Rodar o Projeto

1. **Clone o repositório**

   Clone este repositório para a sua máquina local:

   ```bash
   git clone https://github.com/MatheusGeanezi/url-shortner.git
   cd url-shortener
   docker-compose up --build
   docker-compose up 
   npm install
   npm run dev

# Configurações do Servidor
PORT=3000

# Configurações do Banco de Dados e JWT
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=url_shortner
JWT_SECRET=senha



