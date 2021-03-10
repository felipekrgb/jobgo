import mongoose from 'mongoose';

const CursoSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    escola: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Escola',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Curso', CursoSchema, 'cursos');
