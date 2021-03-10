import mongoose from 'mongoose';

class Database {
  constructor() {
    this.mongo();
  }

  async mongo() {
    try {
      await mongoose.connect('mongodb://localhost/jobgo', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
      console.log('MongoDB conectado');
    } catch (err) {
      console.log('Falha ao conectar', err);
    }
  }
}

export default new Database();
