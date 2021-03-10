import mongoose from 'mongoose';
import bycrypt from 'bcryptjs';

const PessoaSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    telefone: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
    },
    senha: {
      type: String,
      required: true,
      select: false,
    },
    foto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Arquivo',
    },
    curriculo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Arquivo',
      select: false,
    },
    candidaturas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vaga',
        select: false,
      },
    ],
    senhaResetToken: {
      type: String,
      select: false,
    },
    senhaResetExpires: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line func-names
PessoaSchema.pre('save', async function (next) {
  const hash = await bycrypt.hash(this.senha, 10);
  this.senha = hash;

  next();
});

export default mongoose.model('Pessoa', PessoaSchema, 'pessoas');
