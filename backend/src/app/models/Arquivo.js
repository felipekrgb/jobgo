import mongoose from 'mongoose';

const ArquivoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    extensao: {
      type: String,
      required: true,
    },
    usuarioId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

ArquivoSchema.set('toJSON', { getters: true, virtuals: false });

export default mongoose.model('Arquivo', ArquivoSchema, 'arquivos');
