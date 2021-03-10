import Escola from '../models/Escola';
import Curso from '../models/Curso';

class CursoController {
  async store(req, res) {
    try {
      const escola = await Escola.findById(req.userId);

      if (escola === null) {
        return res.status(400).json({ error: 'Escola não encontrada' });
      }

      const curso = await Curso.create({ ...req.body, escola });

      await escola.updateOne({
        $push: {
          cursos: curso,
        },
      });

      return res.status(200).send({ curso });
    } catch (e) {
      return res.status(400).json({ error: 'Falha ao criar curso' });
    }
  }

  async index(req, res) {
    try {
      const cursos = await Curso.find({}).populate({
        path: 'escola',
        select: 'nome descricao foto',
        populate: {
          path: 'foto',
          select: 'url',
        },
      });

      if (cursos.length === 0) {
        return res.status(400).json({ error: 'Nenhum curso encontrado' });
      }

      return res.status(200).send({ cursos });
    } catch (e) {
      return res.status(400).json({ error: 'Ocorreu um erro' });
    }
  }

  async show(req, res) {
    try {
      const curso = await Curso.findById(req.params.id).populate({
        path: 'escola',
        select: 'nome descricao foto',
        populate: {
          path: 'foto',
          select: 'url',
        },
      });

      return res.json({ curso });
    } catch (e) {
      return res.status(400).json({ error: 'Curso não encontrado' });
    }
  }

  async update(req, res) {
    const { titulo, link, descricao } = req.body;

    try {
      const curso = await Curso.findByIdAndUpdate(
        req.params.id,
        { titulo, descricao, link },
        { new: true },
      );

      return res.status(200).json({ curso });
    } catch (e) {
      return res.status(400).json({ error: 'Ocorreu um erro' });
    }
  }

  async delete(req, res) {
    try {
      await Curso.findByIdAndDelete(req.params.id);

      return res.status(200).json({ message: 'Curso deletado com sucesso' });
    } catch (e) {
      return res.status(400).json({ error: 'Erro ao deletar o curso' });
    }
  }
}

export default new CursoController();
