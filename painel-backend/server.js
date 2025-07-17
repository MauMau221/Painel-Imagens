const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');

const app = express();

// Configuração de CORS para aceitar cookies
app.use(cors({
  origin: ['http://192.168.0.105:4200', 'http://localhost:4200', 'http://127.0.0.1:4200'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());
app.use(cookieParser()); // Adicionar middleware para ler cookies
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuração de autenticação
const ADMIN_PASSWORD = 'admin123'; // ALTERE ESTA SENHA!
const SESSION_SECRET = 'painel-secret-key'; // ALTERE ESTA CHAVE!

// Middleware para verificar autenticação
function requireAuth(req, res, next) {
  const isAuthenticated = req.cookies && req.cookies.adminAuth === 'true';
  
  if (!isAuthenticated) {
    return res.status(401).json({ error: 'Acesso negado. Faça login primeiro.' });
  }
  
  next();
}

// Endpoint de login
app.post('/login', (req, res) => {
  const { password } = req.body;
  
  if (password === ADMIN_PASSWORD) {
    res.cookie('adminAuth', 'true', {
      httpOnly: true,
      secure: false, // true em produção com HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
      sameSite: 'lax'
    });
    res.json({ success: true, message: 'Login realizado com sucesso!' });
  } else {
    res.status(401).json({ error: 'Senha incorreta!' });
  }
});

// Endpoint de logout
app.post('/logout', (req, res) => {
  res.clearCookie('adminAuth');
  res.json({ success: true, message: 'Logout realizado com sucesso!' });
});

// Endpoint para verificar se está autenticado
app.get('/auth/check', (req, res) => {
  const isAuthenticated = req.cookies && req.cookies.adminAuth === 'true';
  res.json({ 
    authenticated: isAuthenticated,
    cookies: req.cookies,
    headers: req.headers
  });
});

// Endpoint de debug para verificar cookies
app.get('/debug/cookies', (req, res) => {
  res.json({
    cookies: req.cookies,
    headers: req.headers,
    userAgent: req.get('User-Agent')
  });
});

const CONFIG_PATH = path.join(__dirname, 'config.json');

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    // Remove acentos, espaços e caracteres especiais
    const originalName = file.originalname.normalize('NFD').replace(/[ -\u036f]/g, '');
    const safeName = originalName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, Date.now() + '-' + safeName);
  }
});
const upload = multer({ storage });

// Função para ler config.json
function readConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify({}));
  }
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
}

// Função para salvar config.json
function saveConfig(data) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(data, null, 2));
}

// Endpoint PÚBLICO para obter config (para o site funcionar)
app.get('/config', (req, res) => {
  const config = readConfig();
  res.json(config);
});

// Endpoint PÚBLICO para obter config (para o painel admin também)
app.get('/admin/config', (req, res) => {
  const config = readConfig();
  res.json(config);
});

// Endpoint para upload de imagem (PROTEGIDO)
app.post('/upload', requireAuth, upload.single('image'), (req, res) => {
  const config = readConfig();
  const imagePath = '/uploads/' + req.file.filename;
  config.image = imagePath;
  saveConfig(config);
  res.json({ success: true, image: imagePath });
});

// Endpoint para atualizar config (PROTEGIDO)
app.post('/config', requireAuth, (req, res) => {
  const config = readConfig();
  const newConfig = { ...config, ...req.body };
  saveConfig(newConfig);
  res.json({ success: true, config: newConfig });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000')); 