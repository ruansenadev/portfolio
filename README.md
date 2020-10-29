# Portfolio

  Restful API do app Portfolio.

## Overview

Servidor em Express.
Database MongoDB, modelada com Mongoose.
***
### Installation

  `npm install`

### Usage

É necessário um cluster no [mongoDB Atlas](https://www.mongodb.com/cloud)
[Veja este guia da MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#Setting_up_the_MongoDB_database) para criar um de graça, caso não tenha, e copiar sua **connection string**.

[Gere também](https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx) uma jwt secret 256-bit.

1. Configure as vars num arquivo `.env`:
- Crie o arquivo `.env` no root e forneça
- Url de conexão do mongodb:
```
MONGO_URL=sua_connection_string
```
- Secret key para autenticação:
```
TOKEN_SECRET=secret_jwt
```
- S3 IAM params para uploads:
```
AWS_ACCESS_KEY_ID=k3y1d
AWS_SECRET_ACCESS_KEY=p4s5
S3_BUCKET_NAME=bucket-name
```

2. Crie a conta administrador do portfolio:
- No arquivo `.env` adicione uma senha para criar a conta:
```
ACCOUNT_PASS=senha_temporaria
```
- Modifique o script `createAccount.js` com seus dados
- Seguidamente execute-o `node createAccount.js`
- Deverá ver a saída com os dados da conta

3. Inicie o server:
```
npm run devstart
```

4. Configure-o no app
- Modifique o arquivo do app `src/environments/environment.ts` para linkar a API no localhost

Workspace configurado!

***
### Contributing

  Você quer ajudar á construir um Portfolio open source?
Contribua ao projeto criando um Pull Request ou enviando uma Issue com uma sugestão/problema.
Leia o [Guia de Contribuição](../CONTRIBUTING.md) para mais detalhes.

#### License
  [GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/) Livre para a cópia, contanto que mantenha a mesma licença.
