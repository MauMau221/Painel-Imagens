const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

// Endpoint para upload de imagem
app.post('/upload', upload.single('image'), (req, res) => {
  const config = readConfig();
  const imagePath = '/uploads/' + req.file.filename;
  config.image = imagePath;
  saveConfig(config);
  res.json({ success: true, image: imagePath });
});

// Endpoint para obter config
app.get('/config', (req, res) => {
  const config = readConfig();
  res.json(config);
});

// Endpoint para atualizar config
app.post('/config', (req, res) => {
  const config = readConfig();
  const newConfig = { ...config, ...req.body };
  saveConfig(newConfig);
  res.json({ success: true, config: newConfig });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000')); 