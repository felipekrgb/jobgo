import * as Yup from 'yup';
import Pessoa from '../models/Pessoa';
import Escola from '../models/Escola';
import Empresa from '../models/Empresa';
import AuthController from './AuthController';

class EmpresaController {
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
      const empresa = await Empresa.create(req.body);

      empresa.senha = undefined;

      return res.json({ empresa });
    } catch (err) {
      return res.status(400).json({ error: 'Falha ao registrar' });
    }
  }

  async index(req, res) {
    try {
      const empresas = await Empresa.find({}).populate('vagas');

      if (empresas.length === 0) {
        return res.status(400).json({ error: 'Nenhuma empresa encontrada' });
      }

      return res.json({ empresas });
    } catch (e) {
      return res.status(400).json({ error: 'Ocorreu um erro' });
    }
  }

  async show(req, res) {
    try {
      const empresa = await Empresa.findById(req.params.id);

      return res.json({ empresa });
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

    let empresa = await Empresa.findById(req.userId).select('+senha');

    if (email !== empresa.email) {
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

    if (cnpj !== empresa.cnpj) {
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
        empresa.senha,
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

    const empresaData = {
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
      empresa = await Empresa.findByIdAndUpdate(req.userId, empresaData, {
        new: true,
      })
        .populate('foto', 'nome url')
        .populate('vagas');

      return res.json({ empresa });
    } catch (err) {
      return res.status(400).json({ error: 'Ocorreu um erro' });
    }
  }

  async delete(req, res) {
    try {
      await Empresa.findByIdAndDelete(req.userId);

      return res.json({ message: 'Conta deletada com sucesso' });
    } catch (e) {
      return res.status(400).json({ error: 'Ocorreu um erro' });
    }
  }
}

export default new EmpresaController();
