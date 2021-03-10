import * as Yup from 'yup';
import Pessoa from '../models/Pessoa';
import Empresa from '../models/Empresa';
import Escola from '../models/Escola';
import AuthController from './AuthController';

class EscolaController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      cnpj: Yup.string().required(),
      email: Yup.string().email().required(),
      telefone: Yup.string().required(),
      senha: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const { email, cnpj } = req.body;

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

    let cnpjExiste = await Empresa.findOne({ cnpj });

    if (!cnpjExiste) {
      cnpjExiste = await Escola.findOne({ cnpj });
    }

    if (cnpjExiste) {
      return res.status(400).json({ error: 'CNPJ já cadastrado' });
    }

    try {
      const escola = await Escola.create(req.body);

      escola.senha = undefined;

      return res.json({ escola });
    } catch (err) {
      return res.status(400).json({ error: 'Falha ao registrar' });
    }
  }

  async index(req, res) {
    try {
      const escolas = await Escola.find({});

      if (escolas.length === 0) {
        return res.status(400).json({ error: 'Nenhuma escola encontrada' });
      }

      return res.json({ escolas });
    } catch (e) {
      return res.status(400).json({ error: 'Ocorreu um erro' });
    }
  }

  async show(req, res) {
    try {
      const escola = await Escola.findById(req.params.id);

      return res.json({ escola });
    } catch (e) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      cnpj: Yup.string().required(),
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

    const { email, cnpj, senhaAtual, novaSenha } = req.body;

    let escola = await Escola.findById(req.userId).select('+senha');

    if (email !== escola.email) {
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

    if (cnpj !== escola.cnpj) {
      let cnpjExiste = await Empresa.findOne({ cnpj });

      if (!cnpjExiste) {
        cnpjExiste = await Escola.findOne({ cnpj });
      }

      if (cnpjExiste) {
        return res.status(400).json({ error: 'CNPJ já cadastrado' });
      }
    }

    if (senhaAtual) {
      const senhasIguais = await AuthController.checkPassword(
        senhaAtual,
        escola.senha,
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

    const escolaData = {
      nome: req.body.nome,
      cnpj: req.body.cnpj,
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
      escola = await Escola.findByIdAndUpdate(req.userId, escolaData, {
        new: true,
      })
        .populate('foto', 'nome url')
        .populate('cursos');

      return res.json({ escola });
    } catch (err) {
      return res.status(400).json({ error: 'Ocorreu um erro' });
    }
  }

  async delete(req, res) {
    try {
      await Escola.findByIdAndDelete(req.userId);

      return res.json({ message: 'Conta deletada com sucesso' });
    } catch (e) {
      return res.status(400).json({ error: 'Ocorreu um erro' });
    }
  }
}

export default new EscolaController();
