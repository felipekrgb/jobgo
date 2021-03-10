import mongoose from 'mongoose';
import bycrypt from 'bcryptjs';

const EmpresaSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    cnpj: {
      type: String,
      required: true,
      unique: true,
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
    vagas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vaga',
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
EmpresaSchema.pre('save', async function (next) {
  const hash = await bycrypt.hash(this.senha, 10);
  this.senha = hash;

  next();
});

export default mongoose.model('Empresa', EmpresaSchema, 'empresas');
