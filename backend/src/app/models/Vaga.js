import mongoose from 'mongoose';

const VagaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    periodoInicio: {
      type: String,
      required: true,
    },
    periodoFim: {
      type: String,
      required: true,
    },
    empresa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Empresa',
      required: true,
    },
    candidatos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pessoa',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Vaga', VagaSchema, 'vagas');
