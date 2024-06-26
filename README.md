
## Clone o repositório

[Nest](https://github.com/yourusername/your-repo.git) git clone https://github.com/yourusername/your-repo.git
cd your-repo/backend.

## Instale as dependências:

```bash
$ npm install
```

## 4. Inicialização

Inicie o servidor:
Se estiver usando npm:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Acesse a API:

A API estará disponível em http://localhost:5000


### Backend (NestJS)

### Framework: NestJS

Versão: 7.x ou 8.x
Motivo da Escolha: NestJS é uma estrutura progressiva para Node.js que usa conceitos de TypeScript e Angular para fornecer uma arquitetura modular e de fácil manutenção. Facilita a criação de APIs poderosas e extensíveis.

### Bibliotecas Adicionais:

Mongoose: Para modelagem de dados com MongoDB. Ele fornece soluções baseadas em esquema para modelar dados de aplicativos, facilitando a validação e manipulação de dados.

Multer:lida com uploads de arquivos. É uma biblioteca de middleware para Node.js que ajuda no tratamento de formulários de múltiplas multipart/data.

bcrypt: Para hashing de senhas. Ele é amplamente utilizado para proteger senhas de usuário antes de armazená-las no banco de dados.
Versão: 5.x
Motivo da Escolha: bcrypt é uma biblioteca confiável e testada para hashing de senhas, oferecendo segurança adicional ao processo de autenticação.

mongoose-sequence: Para gerar sequências automáticas de IDs.
Versão: 5.x
Motivo da Escolha: mongoose-sequence pode criar facilmente IDs de incremento automático para documentos MongoDB, o que é útil para cenários onde IDs sequenciais são necessários.

passport, passport-jwt: Middleware de autenticação para Node.js.
Versão: 0.x
Motivo da Escolha: é uma biblioteca flexível e modular para autenticação, com suporte a vários métodos de autenticação.

@nestjs/jwt: Módulo JWT para NestJS.
Versão: 7.x ou 8.x
Motivo da Escolha: @nestjs/jwt facilita a integração de autenticação JWT com NestJS.

@nestjs/passport: Módulo Passport para NestJS.
Versão: 7.x ou 8.x
Motivo da Escolha: @nestjs/passport permite a integração perfeita de Passport com NestJS, oferecendo várias estratégias de autenticação.

@nestjs/serve-static: Servir arquivos estáticos com NestJS.
Versão: 7.x ou 8.x
Motivo da Escolha: @nestjs/serve-static permite servir facilmente arquivos estáticos, como imagens e outros assets, diretamente com NestJS.

### Banco de Dados
Banco de Dados: MongoDB
Versão: 4.x ou 5.x
Motivo da Escolha: MongoDB é um banco de dados NoSQL orientado a documentos, que oferece alta flexibilidade e escalabilidade. É uma escolha popular para aplicações que precisam de um modelo de dados flexível e schema-less.


### Por que Escolhi Essa Stack

TypeScript: Oferece a segurança de tipagem estática e melhorias de produtividade com melhor suporte de ferramentas. Isso é crucial para manter a qualidade do código e reduzir bugs.

React: Escolhido por sua popularidade e eficiência na construção de interfaces de usuário dinâmicas e responsivas. Sua filosofia de componentes permite criar UIs modulares e reutilizáveis.

React Router (react-router-dom): Fornece uma maneira poderosa e flexível de gerenciar a navegação em aplicações React. Permite criar roteamento dinâmico e aninhado, essencial para SPAs complexas.

Bootstrap: Facilita a criação de interfaces modernas e responsivas com uma vasta gama de componentes estilizados prontos para uso.

React Bootstrap: Integra os componentes do Bootstrap com React, permitindo o uso de componentes estilizados de maneira declarativa e compatível com o React.

NestJS: Proporciona uma estrutura modular e robusta para construir APIs escaláveis e de fácil manutenção. A integração com TypeScript é perfeita e oferece uma ótima experiência de desenvolvimento.

MongoDB: Escolhido por sua flexibilidade e capacidade de escalar horizontalmente. É ideal para armazenar documentos JSON-like, que se alinham bem com a estrutura de dados utilizada na aplicação.

bcrypt: Fornece segurança adicional ao processo de autenticação com hashing de senhas.

mongoose-sequence: Facilita a criação de IDs incrementais automáticos para documentos MongoDB.

passport e suas estratégias: Oferecem flexibilidade e modularidade na implementação de autenticação, suportando métodos locais e baseados em JWT.

@nestjs/serve-static: Permite servir facilmente arquivos estáticos, o que é útil para hospedar assets diretamente no backend.




## License

Nest is [MIT licensed](LICENSE).
