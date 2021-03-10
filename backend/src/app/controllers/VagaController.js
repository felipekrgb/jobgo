import Pessoa from '../models/Pessoa';
import Empresa from '../models/Empresa';
import Vaga from '../models/Vaga';

class VagaController {
  async store(req, res) {
    try {
      const empresa = await Empresa.findById(req.userId);

      if (empresa === null) {
        return res.status(400).json({ error: 'Empresa não encontrada' });
      }

      const vaga = await Vaga.create({ ...req.body, empresa });

      await empresa.updateOne({
        $push: {
          vagas: vaga,
        },
      });

      return res.status(200).send({ vaga });
    } catch (e) {
      return res.status(400).json({ error: 'Falha ao criar vaga' });
    }
  }

  async index(req, res) {
    try {
      const vagas = await Vaga.find({}).populate({
        path: 'empresa',
        select: 'nome descricao foto',
        populate: {
          path: 'foto',
          select: 'url',
        },
      });

      if (vagas.length === 0) {
        return res.status(400).json({ error: 'Nenhuma vaga encontrada' });
      }

      return res.status(200).send({ vagas });
    } catch (e) {
      return res.status(400).json({ error: 'Ocorreu um erro' });
    }
  }

  async show(req, res) {
    try {
      const vaga = await Vaga.findById(req.params.id)
        .populate({
          path: 'empresa',
          select: 'nome descricao foto',
          populate: {
            path: 'foto',
            select: 'url',
          },
        })
        .populate({
          path: 'candidatos',
          populate: {
            path: 'foto curriculo',
            select: 'url',
          },
        });

      return res.json({ vaga });
    } catch (e) {
      return res.status(400).json({ error: 'Vaga não encontrado' });
    }
  }

  async update(req, res) {
    const { titulo, tipo, periodoFim, periodoInicio, descricao } = req.body;

    try {
      const vaga = await Vaga.findByIdAndUpdate(
        req.params.id,
        { titulo, tipo, periodoFim, periodoInicio, descricao },
        { new: true },
      );

      return res.status(200).json({ vaga });
    } catch (e) {
      return res.status(400).json({ error: 'Ocorreu um erro' });
    }
  }

  async delete(req, res) {
    try {
      await Vaga.findByIdAndDelete(req.params.id);

      return res.status(200).json({ message: 'Vaga deletada com sucesso' });
    } catch (e) {
      return res.status(400).json({ error: 'Erro ao deletar a vaga' });
    }
  }

  async candidatar(req, res) {
    try {
      const pessoa = await Pessoa.findById(req.userId);
      const vaga = await Vaga.findById(req.params.id).populate({
        path: 'empresa',
        select: 'nome descricao foto',
        populate: {
          path: 'foto',
          select: 'url',
        },
      });

      await pessoa.updateOne({
        $push: {
          candidaturas: vaga,
        },
      });

      await vaga.updateOne({
        $push: {
          candidatos: pessoa,
        },
      });

      return res.status(200).json({ vaga });
    } catch (e) {
      return res.status(400).json({ error: 'Erro ao se candidatar' });
    }
  }
}

export default new VagaController();
