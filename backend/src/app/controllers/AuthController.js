import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import Pessoa from '../models/Pessoa';
import Empresa from '../models/Empresa';
import Escola from '../models/Escola';
import Mail from '../../lib/Mail';
import authConfig from '../../config/auth';

class AuthController {
  async esqueceuSenha(req, res) {
    const { email } = req.body;

    let Usuario = Pessoa;
    let user = await Usuario.findOne({ email });

    if (!user) {
      Usuario = Empresa;
      user = await Usuario.findOne({ email });
    }

    if (!user) {
      Usuario = Escola;
      user = await Usuario.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ error: 'Email não encontrado' });
    }

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    try {
      await Usuario.findByIdAndUpdate(user.id, {
        $set: {
          senhaResetToken: token,
          senhaResetExpires: now,
        },
      });
    } catch (e) {
      return res.status(400).json({ error: 'Ocorreu um erro' });
    }

    try {
      await Mail.sendMail({
        to: `Nome do usuário <${email}>`,
        subject: 'Recuperação de senha',
        template: 'esqueceu-senha',
        context: { link: `http://localhost:3000/reset-senha?token=${token}` },
      });

      return res.status(200).json({ message: 'Email enviado' });
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Não foi possível enviar o email de recuperação' });
    }
  }

  async resetSenha(req, res) {
    const { senha, repetirSenha, token } = req.body;

    if (senha !== repetirSenha) {
      return res.status(400).json({ error: 'As senhas precisam ser iguais' });
    }

    try {
      let Usuario = Pessoa;
      let user = await Usuario.findOne({ senhaResetToken: token }).select(
        '+senhaResetToken senhaResetExpires',
      );

      if (!user) {
        Usuario = Empresa;
        user = await Usuario.findOne({ senhaResetToken: token }).select(
          '+senhaResetToken senhaResetExpires',
        );
      }

      if (!user) {
        Usuario = Escola;
        user = await Usuario.findOne({ senhaResetToken: token }).select(
          '+senhaResetToken senhaResetExpires',
        );
      }

      if (!user) {
        return res.status(400).json({ error: 'Token inválido' });
      }

      const now = new Date();

      if (now > user.senhaResetExpires) {
        return res.status(400).json({ error: 'Token expirou, gere novamente' });
      }

      user.senha = senha;

      await user.save();

      return res.status(200).json({ message: 'Senha recuperada com sucesso' });
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Não foi possível resetar a senha' });
    }
  }

  generateToken(id, tipo) {
    return jwt.sign({ id, tipo }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
  }

  async checkPassword(senha1, senha2) {
    return bcrypt.compare(senha1, senha2);
  }

  async generatePassword(senha) {
    return bcrypt.hash(senha, 10);
  }
}

export default new AuthController();
