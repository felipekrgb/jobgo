// Sucrase
import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import PessoaController from './app/controllers/PessoaController';
import EmpresaController from './app/controllers/EmpresaController';
import EscolaController from './app/controllers/EscolaController';
import VagaController from './app/controllers/VagaController';
import CursoController from './app/controllers/CursoController';
import SessionController from './app/controllers/SessionController';
import AuthController from './app/controllers/AuthController';
import ArquivoController from './app/controllers/ArquivoController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Autenticação (login)
routes.post('/session', SessionController.store);

// Registrar
routes.post('/pessoa', PessoaController.store);
routes.post('/empresa', EmpresaController.store);
routes.post('/escola', EscolaController.store);

// Esqueci minha senha
routes.post('/esqueci-senha', AuthController.esqueceuSenha);
routes.post('/reset-senha', AuthController.resetSenha);

// Middleware para verificar a autenticação (token), só funciona para as rotas abaixo
routes.use(authMiddleware);

// Criar vagas e cursos
routes.post('/vaga', VagaController.store);
routes.post('/curso', CursoController.store);

// Candidatar-se à vagas
routes.put('/vaga/candidatar/:id', VagaController.candidatar);

// Listar todos
routes.get('/pessoa', PessoaController.index);
routes.get('/empresa', EmpresaController.index);
routes.get('/escola', EscolaController.index);
routes.get('/vaga', VagaController.index);
routes.get('/curso', CursoController.index);

// Listar um
routes.get('/pessoa/:id', PessoaController.show);
routes.get('/empresa/:id', EmpresaController.show);
routes.get('/escola/:id', EscolaController.show);
routes.get('/vaga/:id', VagaController.show);
routes.get('/curso/:id', CursoController.show);

// Atualizar
routes.put('/pessoa', PessoaController.update);
routes.put('/empresa', EmpresaController.update);
routes.put('/escola', EscolaController.update);
routes.put('/vaga/:id', VagaController.update);
routes.put('/curso/:id', CursoController.update);

// Deletar
routes.delete('/pessoa', PessoaController.delete);
routes.delete('/empresa', EmpresaController.delete);
routes.delete('/escola', EscolaController.delete);
routes.delete('/vaga/:id', VagaController.delete);
routes.delete('/curso/:id', CursoController.delete);

// Arquivos
routes.post('/arquivo', upload.any(), ArquivoController.store);

export default routes;
