# Portfolio

  Web app pessoal e profissional, um perfil online. Com blog, e álbum de projetos para exíbi-los e linka-los externamente.

## Overview

Servidor em Express para app do Portfolio.
Database conectada a [nuvem](https://www.mongodb.com/cloud), API Restful.
***
### Installation

  `npm install`

### Usage

Primeiramente configure um arquivo `.env` no root, com link para sua db **MONGO_URL**, [gere](https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx) uma jwt secret 256-bit **TOKEN_SECRET**, e sua senha para gerar conta por script **ACCOUNT_PASS**.
 Seguidamente modifique o script `createAccount.js` com seus dados (poderá modificar depois no app), e execute-o com `node createAccount.js`, se a database tiver conectada corretamente deverá ver a saída da conta no comando.

Após configurado, Inicie o server `npm run devstart` (localhost:3000).
***
### Contribuindo

  PR são bem-vindas, crie um branch e commite e envie para testar e dar merge se for o caso. Me contate se desejar ser um contribuidor ativo.

#### Licença
  [AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) Livre para a cópia, contanto que mantenha créditos e a mesma licença.
