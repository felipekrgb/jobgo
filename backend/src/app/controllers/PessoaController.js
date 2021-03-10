import * as Yup from 'yup';
import Pessoa from '../models/Pessoa';
import Empresa from '../models/Empresa';
import Escola from '../models/Escola';
import AuthController from './AuthController';

class PessoaController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      telefone: Yup.string().required(),
      senha: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const { email } = req.body;

    let emailExiste = await Pessoa.findOne({ email });

    if (!emailExiste) {
      emailExiste = await Empresa.findOne({ email });
    }

    if (!emailExiste) {
      emailExiste = await Escola.findOne({ email });
    }

    if (emailExiste) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    try {
      const pessoa = await Pessoa.create(req.body);

      pessoa.senha = undefined;

      return res.json({
        pessoa,
      });
    } catch (err) {
      return res.status(400).json({ error: 'Falha ao registrar' });
    }
  }

  async index(req, res) {
    try {
      const pessoas = await Pessoa.find({}).populate('foto', 'nome url');

      if (pessoas.length === 0) {
        return res.status(400).json({ error: 'Nenhuma pessoa encontrada' });
      }

      return res.json({ pessoas });
    } catch (e) {
      return res.status(400).json({ error: 'Ocorreu um erro' });
    }
  }

  async show(req, res) {
    try {
      const pessoa = await Pessoa.findById(req.params.id).populate({
        path: 'foto curriculo',
        select: 'url',
      });

      return res.json({ pessoa });
    } catch (e) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().required().email(),
      telefone: Yup.string().required(),
      descricao: Yup.string(),
      senhaAtual: Yup.string(),
      novaSenha: Yup.string()
        .min(6)
        .when('senhaAtual', (senhaAntiga, field) =>
          senhaAntiga ? field.required() : field,
        ),
      repetirNovaSenha: Yup.string().when('novaSenha', (senha, field) =>
        senha ? field.required().oneOf([Yup.ref('novaSenha')]) : field,
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const { email, senhaAtual, novaSenha } = req.body;

    let pessoa = await Pessoa.findById(req.userId).select('+senha');

    if (email !== pessoa.email) {
      let emailExiste = await Pessoa.findOne({ email });

      if (!emailExiste) {
        emailExiste = await Empresa.findOne({ email });
      }

      if (!emailExiste) {
        emailExiste = await Escola.findOne({ email });
      }

      if (emailExiste) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }
    }

    if (senhaAtual) {
      const senhasIguais = await AuthController.checkPassword(
        senhaAtual,
        pessoa.senha,
      );

      if (senhaAtual && !senhasIguais) {
        return res.status(401).json({ error: 'A senha não corresponde' });
      }

      try {
        const hash = await AuthController.generatePassword(novaSenha);
        req.body.novaSenha = hash;
      } catch (e) {
        return res.status(400).json({ error: 'Erro ao gerar o hash da senha' });
      }
    }

    const pessoaData = {
      nome: req.body.nome,
      email: req.body.email,
      telefone: req.body.telefone,
      ...(req.body.descricao
        ? {
            descricao: req.body.descricao,
          }
        : {}),
      ...(req.body.senhaAtual
        ? {
            senha: req.body.novaSenha,
          }
        : {}),
    };

    try {
      pessoa = await Pessoa.findByIdAndUpdate(req.userId, pessoaData, {
        new: true,
      })
        .populate('foto', 'nome url')
        .populate('curriculo', 'nome url');

      return res.json({ pessoa });
    } catch (err) {
      return res.status(400).json({ error: 'Ocorreu um erro' });
    }
  }

  async delete(req, res) {
    try {
      await Pessoa.findByIdAndDelete(req.userId);

      return res.json({ message: 'Conta deletada com sucesso' });
    } catch (e) {
      return res.status(400).json({ error: 'Ocorreu um erro' });
    }
  }
}

export default new PessoaController();
