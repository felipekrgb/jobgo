import * as Yup from 'yup';
import bycrypt from 'bcryptjs';
import AuthController from './AuthController';

import Pessoa from '../models/Pessoa';
import Empresa from '../models/Empresa';
import Escola from '../models/Escola';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      senha: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const { email, senha } = req.body;

    let user = await Pessoa.findOne({ email })
      .select('+senha')
      .populate('foto', 'nome url')
      .populate('curriculo', 'nome url')
      .populate({
        path: 'candidaturas',
        populate: {
          path: 'empresa',
          select: 'foto',
          populate: {
            path: 'foto',
            select: 'url',
          },
        },
      });
    let tipo = 'pessoa';

    if (!user) {
      user = await Empresa.findOne({ email })
        .select('+senha')
        .populate('foto', 'nome url')
        .populate('vagas');
      tipo = 'empresa';
    }

    if (!user) {
      user = await Escola.findOne({ email })
        .select('+senha')
        .populate('foto', 'nome url')
        .populate('cursos');
      tipo = 'escola';
    }

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    if (!(await bycrypt.compare(senha, user.senha))) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    user.senha = undefined;

    return res.json({
      user,
      tipo,
      token: AuthController.generateToken(user.id, tipo),
    });
  }
}

export default new SessionController();
