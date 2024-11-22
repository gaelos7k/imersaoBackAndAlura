import express from "express"; // Importa o módulo Express para criar o servidor web
import multer from "multer"; // Importa o módulo Multer para lidar com uploads de arquivos
// Importa as funções controladoras dos posts
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";
const corsOptions = {
    origin: "http://localhost:8000", 
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    // Define o diretório de destino para os arquivos enviados
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // Define o nome do arquivo salvo (mantém o nome original)
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

// Cria uma instância do middleware Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage })

const routes = (app) => {
    // Habilita o middleware para analisar corpos de requisições JSON (padrão para rotas REST)
    app.use(express.json());
    app.use(cors(corsOptions));

    // Rota GET para listar todos os posts (provavelmente chama a função listarPosts no controller)
    app.get("/posts", listarPosts);

    // Rota POST para criar um novo post (provavelmente chama a função postarNovoPost no controller)
    app.post("/posts", postarNovoPost)

    // Rota POST para upload de imagem (usa o middleware Multer e chama a função uploadImagem no controller)
    app.post("/upload", upload.single("imagem"), uploadImagem)

    app.put("/upload/:id", atualizarNovoPost);
}

export default routes; // Exporta a função routes para ser utilizada no arquivo principal