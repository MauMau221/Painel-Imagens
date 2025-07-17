# Painel de Imagens - Sistema Completo

Este projeto é um sistema completo de gerenciamento de imagens para sites, composto por um **frontend Angular** e um **backend Node.js**. Permite alterar imagens dinamicamente sem precisar recompilar o código.

## 📋 Estrutura do Projeto

```
Painel-Imagens/
├── painel/                 # Frontend Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # Componentes do site
│   │   │   └── services/   # Serviços de API
│   │   └── environments/   # Configurações de ambiente
│   └── package.json
└── painel-backend/         # Backend Node.js
    ├── server.js           # Servidor principal
    ├── config.json         # Configurações do site
    ├── uploads/            # Pasta de imagens
    └── package.json
```

## 🚀 Pré-requisitos

### Para o Backend:
- Node.js 16 ou superior
- NPM ou Yarn

### Para o Frontend:
- Node.js 16 ou superior
- Angular CLI (`npm install -g @angular/cli`)

## ⚙️ Instalação e Configuração

### 1. Backend (Node.js)

```bash
cd painel-backend
npm install
mkdir uploads
```

**Dependências necessárias:**
- `express` - Servidor web
- `multer` - Upload de arquivos
- `cors` - Cross-Origin Resource Sharing
- `cookie-parser` - Leitura de cookies (para autenticação)

**Configuração do IP:**
- Edite `server.js` linha 62: `app.listen(3000, 'SEU_IP_AQUI', () => ...)`
- Ou deixe `app.listen(3000, () => ...)` para aceitar conexões de qualquer IP

### 2. Frontend (Angular)

```bash
cd painel
npm install
```

**Configuração do Backend URL:**
Edite os arquivos de ambiente:
- `src/environments/environment.ts` (desenvolvimento)
- `src/environments/environment.prod.ts` (produção)

```typescript
export const environment = {
  production: false, // true para produção
  backendUrl: 'http://SEU_IP_DO_BACKEND:3000'
};
```

## 🏃‍♂️ Como Executar

### Desenvolvimento

**Backend:**
```bash
cd painel-backend
node server.js
```

**Frontend:**
```bash
cd painel
ng serve
```

### Produção

**Backend:**
```bash
cd painel-backend
node server.js
```

**Frontend:**
```bash
cd painel
ng build
# Os arquivos ficam em dist/painel/
```

## 📊 Estrutura de Dados (config.json)

O arquivo `config.json` armazena todas as configurações do site:

```json
{
  "themeLight": {
    "--color-dark-blue": "#000018",
    "--color-blue": "#a00e5c",
    // ... outras cores
  },
  "themeDark": {
    "--color-dark-blue": "#181818",
    "--color-blue": "#23234a",
    // ... outras cores
  },
  "banner": "/uploads/banner.png",
  "bannerMobile": "/uploads/banner-mobile.png",
  "depoimentos": "/uploads/depoimentos.png",
  "depoimentosMobile": "/uploads/depoimentos-mobile.png",
  "vantagens": "/uploads/vantagens.png",
  "vantagensMobile": "/uploads/vantagens-mobile.png",
  "atendente": "/uploads/atendente.png",
  "planos": [
    {
      "nome": "500",
      "desktop": "/uploads/plano-500.png",
      "mobile": "/uploads/plano-500-mobile.png"
    }
  ]
}
```

## 🎨 Sistema de Temas

### Configuração de Temas
O sistema suporta temas claro e escuro com cores personalizáveis:

#### Estrutura no config.json:
```json
{
  "themeLight": {
    "--color-dark-blue": "#000018",
    "--color-blue": "#026cc8",
    // ... outras cores do tema claro
  },
  "themeDark": {
    "--color-dark-blue": "#181818",
    "--color-blue": "#23234a",
    // ... outras cores do tema escuro
  }
}
```

### Como Usar:
1. **Toggle de Tema:** Botão no canto superior esquerdo do site
2. **Painel Admin:** Acesse `/admin-theme` para personalizar cores
3. **Preferência Salva:** O tema escolhido é salvo no localStorage

### Variáveis de Cor Disponíveis:
- `--color-dark-blue`: Azul escuro principal
- `--color-blue`: Azul secundário
- `--color-orange`: Laranja/Ciano
- `--color-white`: Branco/Fundo escuro
- `--color-light-gray`: Cinza claro
- `--color-cyan`: Ciano
- `--color-cyan-hover`: Ciano hover
- `--color-orange-light`: Laranja claro
- `--color-whatsapp-green`: Verde WhatsApp
- `--color-whatsapp-hover`: Verde WhatsApp hover
- `--main-bg-color`: Cor de fundo principal
- `--main-text-color`: Cor do texto principal
- `--main-link-color`: Cor dos links
- `--main-button-color`: Cor dos botões

### Personalização:
- Acesse `/admin-theme` após fazer login
- Escolha entre tema claro ou escuro
- Ajuste as cores usando os color pickers
- Clique em "Aplicar Cores" para salvar

## 🔧 Endpoints da API

### POST /upload
- **Função:** Upload de imagem
- **Body:** `multipart/form-data` com campo `image`
- **Resposta:** `{ success: true, image: "/uploads/nome-da-imagem.jpg" }`

### GET /config
- **Função:** Obter configurações atuais
- **Resposta:** JSON com todas as configurações

### POST /config
- **Função:** Atualizar configurações
- **Body:** JSON com configurações a atualizar
- **Resposta:** `{ success: true, config: { ... } }`

## 🎨 Componentes do Frontend

### Componentes Principais:
- **Banner Principal:** Imagem principal do site
- **Depoimentos:** Seção de depoimentos de clientes
- **Clube Vantagens:** Seção de vantagens
- **Planos:** Planos de internet (dinâmicos)
- **Contato:** Seção de contato com atendente
- **Admin Images:** Painel administrativo

### Painel Administrativo:
- Acesso via rota `/admin-images`
- Permite alterar todas as imagens do site
- Upload de imagens desktop e mobile
- Gerenciamento de planos

## 🌐 Configuração para Produção

### 1. Backend
```bash
# Instalar PM2 para gerenciamento de processos
npm install -g pm2

# Iniciar com PM2
pm2 start server.js --name "painel-backend"

# Configurar para iniciar com o sistema
pm2 startup
pm2 save
```

### 2. Frontend
```bash
# Build para produção
ng build --configuration production

# Servir arquivos estáticos (exemplo com nginx)
# Copiar conteúdo de dist/painel/ para pasta do servidor web
```

### 3. Configurações de Rede
- **Backend:** Porta 3000
- **Frontend:** Porta 4200 (desenvolvimento) ou servidor web (produção)
- **CORS:** Configurado para aceitar conexões do frontend

## 🔐 Autenticação do Painel Administrativo

### Configuração de Senha
O sistema possui autenticação básica para proteger o painel administrativo:

1. **Alterar senha no backend:**
   - Edite `server.js` linha 9: `const ADMIN_PASSWORD = 'SUA_SENHA_AQUI';`
   - Recomendado: Use uma senha forte (mínimo 8 caracteres)

2. **Alterar chave de sessão:**
   - Edite `server.js` linha 10: `const SESSION_SECRET = 'SUA_CHAVE_SECRETA_AQUI';`

### Acesso ao Painel
1. Acesse: `http://seu-dominio/admin-login`
2. Digite a senha configurada
3. Após login, será redirecionado para `/admin-images`

### Segurança
- **Sessão:** 24 horas de duração
- **Cookies:** HttpOnly para maior segurança
- **Logout:** Botão disponível no painel
- **Proteção:** Todos os endpoints administrativos são protegidos

### Endpoints de Autenticação
- `POST /login` - Fazer login
- `POST /logout` - Fazer logout  
- `GET /auth/check` - Verificar se está autenticado

## 🔒 Segurança

### Recomendações:
- Use HTTPS em produção
- Configure firewall para limitar acesso
- Implemente autenticação para o painel admin
- Faça backup regular do `config.json` e pasta `uploads/`

## 📝 Logs e Debug

### Backend:
- Logs no console do servidor
- Verificar pasta `uploads/` para imagens
- Verificar `config.json` para configurações

### Frontend:
- Console do navegador (F12)
- Network tab para verificar requisições
- Verificar se `backendUrl` está correto

## 🚨 Troubleshooting

### Problemas Comuns:

1. **Imagens não carregam:**
   - Verificar se backend está rodando
   - Verificar se `backendUrl` está correto
   - Verificar se pasta `uploads/` existe

2. **Erro de CORS:**
   - Verificar se CORS está habilitado no backend
   - Verificar se URLs estão corretas

3. **Upload não funciona:**
   - Verificar permissões da pasta `uploads/`
   - Verificar se multer está configurado

4. **Build falha:**
   - Verificar se todas as dependências estão instaladas
   - Verificar se TypeScript está configurado

5. **Autenticação não funciona:**
   - Verificar se `cookie-parser` está instalado
   - Verificar se CORS está configurado corretamente
   - Verificar se cookies estão sendo enviados

## 📞 Suporte

Para dúvidas ou problemas:
1. Verificar logs do backend
2. Verificar console do navegador
3. Verificar se todas as configurações estão corretas
4. Contatar o desenvolvedor responsável

---

**Versão:** 1.0.0  
**Última atualização:** Dezembro 2024 