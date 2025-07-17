# Painel Backend (Simples)

Este projeto é um backend em Node.js para upload de imagens e armazenamento de configurações básicas (como cores do site), sem uso de banco de dados. Tudo é salvo em arquivos locais.

## Pré-requisitos

- Node.js 16 ou superior
- Git (opcional, para clonar o projeto)

## Instalação

1. **Clone o repositório ou copie os arquivos para a máquina desejada:**

```bash
git clone <url-do-repositorio> painel-backend
cd painel-backend
```

2. **Instale as dependências:**

```bash
npm install express multer cors
```

3. **Crie a pasta de uploads:**

```bash
mkdir uploads
```

## Rodando o servidor

```bash
node server.js
```

O backend estará disponível em `http://localhost:3000` (ou no IP da sua máquina, ex: `http://192.168.1.30:3000`).

## Estrutura de pastas

```
painel-backend/
  server.js
  config.json         # Arquivo de configurações (cores, caminho da imagem, etc)
  uploads/            # Imagens salvas
  README.md
```

## Endpoints

### POST /upload
- Recebe uma imagem via multipart/form-data (campo: `image`).
- Salva a imagem em `/uploads` e atualiza o `config.json` com o caminho da imagem.
- Resposta: `{ success: true, image: "/uploads/nome-da-imagem.jpg" }`

### GET /config
- Retorna o conteúdo do `config.json`.

### POST /config
- Atualiza o conteúdo do `config.json` (envie um JSON no body).
- Resposta: `{ success: true, config: { ... } }`

## Dicas
- Sempre crie a pasta `uploads` antes de rodar o servidor.
- Para rodar em outra máquina, basta copiar a pasta do projeto, instalar dependências e garantir que a pasta `uploads` exista.
- Para produção, use um gerenciador de processos como PM2.

## Importante: Configuração do backendUrl no Angular

- O endereço do backend (`backendUrl`) nos componentes Angular deve ser ajustado conforme o ambiente:
  - **Desenvolvimento local:**
    ```typescript
    backendUrl = 'http://localhost:3000';
    ```
  - **Acesso por outros dispositivos na mesma rede:**
    ```typescript
    backendUrl = 'http://<IP-da-sua-máquina>:3000';
    // Exemplo: backendUrl = 'http://192.168.1.30:3000';
    ```
  - **Produção:**
    ```typescript
    backendUrl = 'https://seudominio.com';
    ```
- Lembre-se de atualizar esse valor em todos os componentes que usam imagens do backend.
- Se mudar o IP ou domínio do backend, atualize o valor do `backendUrl`.

---
Dúvidas? Fale com o desenvolvedor responsável. 

---

## Gerenciamento de Cores e Temas

- Todas as cores de fundo das seções principais (ex: Top Bar, Banner, Planos, Clube de Vantagens, Depoimentos, Contato, Footer) são controladas **exclusivamente via JavaScript** pelo painel de temas (admin-theme).
- **Não defina variáveis de fundo (`--bg-...`) no CSS global** (`styles.css`). O painel de temas salva e aplica essas variáveis dinamicamente, inclusive com suporte a gradientes.
- O painel de temas permite escolher duas cores e o ângulo para cada fundo, gerando um gradiente customizado para cada seção.
- As variáveis globais genéricas (ex: `--main-bg-color`, `--primary-color`, etc.) ainda podem ser definidas no CSS global normalmente.
- Se precisar adicionar novas seções customizáveis, siga o padrão do painel de temas e **não defina as variáveis de fundo no CSS**.

> **Importante:** Se variáveis de fundo forem definidas no CSS global, elas podem sobrescrever o valor dinâmico do painel de temas e impedir o funcionamento correto do gradiente. 