import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Configura la ruta absoluta (similar a __dirname en CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());

// Ruta al directorio de uploads
const uploadDir = path.join(__dirname, 'uploads');

// Crear el directorio 'uploads' si no existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);  // Directorio donde se guardan los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Añadir marca de tiempo al nombre del archivo
  },
});

const upload = multer({ storage });

// Ruta para subir archivos
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }
  res.status(200).send({ message: 'File uploaded successfully', file: req.file });
});

app.get('/saludo', (req, res) => {
  res.status(200).send({ message: 'Holaaaaa'})
})

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
