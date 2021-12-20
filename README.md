# <p align="center">Enterprises API<p>

## 👓 Visão Geral
Aplicação para gestão de empresas e usuários com intuito de facilitar a gestão do seu negócio.

## ⛏ Tecnologias

### Principais tecnologias do projeto:
- [NodeJs](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [ExpressJs](https://expressjs.com/pt-br/)
- [JWT](https://jwt.io/)
- [Swagger](https://swagger.io/)
- [Typeorm](https://typeorm.io/#/)

## 👨‍💻 Inciando o projeto
### 📃 Clonando repositório
>Faça a clonagem do repositório na sua maquina utilizando a url de clonagem http ou ssh.

### 🏃‍♂️ Iniciando
>Após feito a clonagem abra o diretorio do arquivo em seu terminal e utilize o comando abaixo para instalar todas dependencias necessárias para o funcionamento da aplição.
>Use o gerenciado de pacotes de sua preferencia.

````
yarn install
````
ou
````
npm install
````
### 📁 Configurações do Banco de Dados
>Com as dependecias instaladas abra o arquivo de configuração de banco de dados:

      ormconfig.example.json
>Altere o nome de ormconfig.example.json para

      ormconfig.json
>Foi utilizando neste desáfio o banco de dados Postgresql.
>
>Vá até seu gerenciado de banco de dados e crie um banco de dados com o nome de sua preferencia.
>
> Neste desáfio foi utilizando o nome apienterprises.
>
>Dentro de ormconfig.json altere as configurações de username, password e database para as do seu banco.

>Agora vamos rodas as migrations para criação da tabelas no banco.
>
>Com o terminal ainda aberto no diretorio do projeto, rode o seguinte script para rodar as migrations.
>
````
yarn typeorm migration:run
````
ou
````
npm typeorm migration:run
````
>Será criado no seu banco as tabelas necessárias para o funcionamento do projeto.

### 📤 Executando o Seed Admin
>Vamos executar agora o seed de admin, para criar um usuário administrador no banco para que possamos
>realizar as operações que exigem determinadas permissões na aplicação.

>Ainda com terminal aberto no diretório do projeto execute o seguinte script

````
yarn seed:admin
````
ou
````
npm seed:admin
````
>As informções de acessos do usuário admin são as seguintes

      email: admin@gmail.com
>
      password: admin

### 👁‍🗨 Observação
>Todos os scripts citados acima encontram-se no arquivo package.json na seção SCRIPTS

## 🚀 Executando Aplicação
>Com todos os passos anteriores executados com sucesso é hora de executar a aplicação, para isso execute o script a seguir em seu terminal, no diretorio onde se encontra o projeto.

````
yarn dev
````
ou
````
npm dev
````
>Se tudo ocorrer bem deve aparecer em seu terminal a seguinte mensagem

     Server is Running... 🚀

>A aplicação está sendo executada na porta 3333 no localhost

````
http://localhost:3333
````
## 📄 Documentação
>A api possui a documentação utilizando o Swagger, a rota inicial já aponta para a mesma, nela contem todos os endpoints e os paramentros necessários para a utilização.

## 🏁 Conclusão
>Este projeto fez parte de uma desáfio para uma vaga de desenvolvedor FullStack utilizando a stack JavaScript.
