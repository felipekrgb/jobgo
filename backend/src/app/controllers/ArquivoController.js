import fs from 'fs';
import { promisify } from 'util';
import { resolve } from 'path';

import Arquivo from '../models/Arquivo';
import Pessoa from '../models/Pessoa';
import Escola from '../models/Escola';
import Empresa from '../models/Empresa';

class ArquivoController {
  async store(req, res) {
    const {
      originalname: nome,
      filename: path,
      mimetype: extensao,
    } = req.files[0];

    let Usuario = Pessoa;

    if (req.userTipo === 'escola') {
      Usuario = Escola;
    }

    if (req.userTipo === 'empresa') {
      Usuario = Empresa;
    }

    try {
      if (req.userTipo !== 'pessoa' && extensao === 'application/pdf') {
        await promisify(fs.unlink)(
          resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', path),
        );
        return res.status(400).json({ error: 'Falha ao salvar o arquivo' });
      }

      const arquivo = await Arquivo.create({
        nome,
        path,
        url: `http://localhost:3333/arquivos/${path}`,
        extensao,
        usuarioId: req.userId,
      });

      const usuario = await Usuario.findById(req.userId)
        .populate('foto')
        .populate('curriculo');

      if (
        req.userTipo === 'pessoa' &&
        extensao === 'application/pdf' &&
        usuario.curriculo
      ) {
        await promisify(fs.unlink)(
          resolve(
            __dirname,
            '..',
            '..',
            '..',
            'tmp',
            'uploads',
            usuario.curriculo.path,
          ),
        );

        await Arquivo.findByIdAndDelete(usuario.curriculo);
      } else if (usuario.foto && extensao !== 'application/pdf') {
        await promisify(fs.unlink)(
          resolve(
            __dirname,
            '..',
            '..',
            '..',
            'tmp',
            'uploads',
            usuario.foto.path,
          ),
        );
        await Arquivo.findByIdAndDelete(usuario.foto);
      }

      if (req.userTipo === 'pessoa' && extensao === 'application/pdf') {
        await Usuario.findByIdAndUpdate(
          req.userId,
          { curriculo: arquivo },
          { new: true },
        );
      } else {
        await Usuario.findByIdAndUpdate(
          req.userId,
          { foto: arquivo },
          { new: true },
        );
      }

      return res.status(200).json({ arquivo });
    } catch (e) {
      return res.status(400).json({ error: 'Falha ao salvar o arquivo' });
    }
  }
}

export default new ArquivoController();
