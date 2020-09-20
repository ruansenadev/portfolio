# Portfolio

  Web app pessoal e profissional, um perfil online. Com blog, e álbum de projetos para exíbi-los e linka-los externamente.

## Overview

Desenvolvido em MEAN Stack. App MVC gerenciável pelo client Angular com conta administrador.
Database conectada a [nuvem](https://www.mongodb.com/cloud), API Restful.
Estrutura integrada app + client, o Express serve build do Angular, porém facilmente adaptável para solução app e client.
***
### Installation

  `npm install`
Projeto gerado inicialmente com [Angular CLI](https://github.com/angular/angular-cli) v9.1.9.

### Usage

Primeiramente configure um arquivo `.env` no root para o servidor, com link para sua db **MONGO_URL**, [gere](https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx) uma jwt secret 256-bit **TOKEN_SECRET**, e sua senha para gerar conta por script **ACCOUNT_PASS**. Seguidamente modifique o script `createAccount.js` com seus dados (poderá modificar depois no app), e execute-o com `node createAccount.js`, se a database tiver conectada corretamente deverá ver a saída da conta no comando.

Após configurado, Inicie o server `npm run server` (localhost:3000). Então inicie o app com `npm run app` ou `ng serve` e acesse **localhost:4200**. O app atualizará automaticamente ás mudanças nos arquivos.
***
### Contribuindo

  PR são bem-vindas, criação de módulos no app ou alterção no server crie um branch, commite e submeta que irei testar e dar merge se for o caso. Me contate se desejar ser um contribuidor ativo.

#### Licença
  [AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) Livre para a cópia, contanto que mantenha créditos e a mesma licença.
