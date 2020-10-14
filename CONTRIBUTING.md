##  Contribuindo


Qualquer PR de qualidade é bem-vindo :open_hands:

> Your pull requests will count toward your participation if they are in a repository with the hacktoberfest topic and once they have been merged, approved by a maintainer or labelled as hacktoberfest-accepted.
Seu PR será marcado com `hacktoberfest-accepted` :smiley:

### Tem uma sugestão ou encontrou algum bug?

Abra uma nova issue se não já existir e informe detalhadamente a questão.

### Enviando um Pull Request (PR)

**Antes de criar um PR:**
* Fork o repositório
* Clone com o submodule do app-server
```
git clone --recurse-submodules url_do_seu_fork
```
* Certifique-se que o submodule está no HEAD do origin
```
// ~/Portfolio
git submodule update --remote
```
* **Crie um novo branch**
```
// ~/Portfolio/app-server
git checkout -b minha-mudanca-branch
```
* Adicione as mudanças `git add -A`
* Commite com uma boa descrição `git commit -m "detailed changes message"`
* No app commite o estado do submodule
```
// ~/Portfolio/app-server
cd ..
// ~/Portfolio
git add app-server
git commit -m "change message"
```
* Push o commite para o GitHub
```
// ~/Portfolio
git push origin --recurse-submodules=on-demand
```
* No GitHub envie o PR para `portfolio:master`


**Ao enviar um PR:**
* Certifique-se que há uma issue aberta em relação as suas mudanças, pois será mais fácil o merge
* Se não houver issue certifique-se de detalhar o PR

***

 Me contate se desejar ser um contribuidor ativo :.